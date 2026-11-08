import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/GLTFLoader.js';

const loader = new GLTFLoader();
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const paper = new THREE.MeshBasicMaterial({color:0xfffefa,side:THREE.DoubleSide});
const softInk = new THREE.MeshBasicMaterial({color:0x666c66,side:THREE.DoubleSide});
const edge = new THREE.LineBasicMaterial({color:0x272a28,transparent:true,opacity:.77});
const wash = new THREE.ShaderMaterial({
  side:THREE.BackSide,
  depthWrite:false,
  vertexShader:`
    void main() {
      vec3 ink = position + normal * (0.012 + 0.008 * sin(position.x*13.0 + position.z*9.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(ink,1.0);
    }`,
  fragmentShader:`void main() { gl_FragColor = vec4(0.15,0.16,0.15,1.0); }`
});

export async function floatModel(view, still, id, index, signal) {
  if (signal.aborted) return;
  const {scene:model} = await loader.loadAsync('./'+id+'.glb?v=refined-collection');
  const originalMaterials = new Set();
  model.traverse(object => { if (object.isMesh) originalMaterials.add(object.material); });
  originalMaterials.forEach(material => material.dispose());
  if (signal.aborted) {
    model.traverse(object => object.geometry?.dispose());
    return;
  }
  const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2.1,2.1,1.4,-1.4,.1,20);
  camera.position.z = 6;
  const pivot = new THREE.Group();
  const orientation = new THREE.Group();
  scene.add(pivot);
  pivot.add(orientation);
  orientation.add(model);
  const bounds = new THREE.Box3().setFromObject(model);
  const radius = bounds.getBoundingSphere(new THREE.Sphere()).radius;
  const clearance = radius + .19; // Allow for the ink outline and vertical drift.
  model.position.sub(bounds.getCenter(new THREE.Vector3()));
  if (id === 'film') orientation.rotation.y = Math.PI;
  else orientation.rotation.x = Math.PI/2;
  const meshes = [];
  const tapeInk = id === 'key' ? paper.clone() : null;
  const inkTexture = tapeInk && view.inkCanvas ? new THREE.CanvasTexture(view.inkCanvas) : null;
  if (inkTexture) {
    inkTexture.colorSpace = THREE.SRGBColorSpace;
    tapeInk.color.set('#ffffff');
    tapeInk.map = inkTexture;
    view.addEventListener('inkchange',() => { inkTexture.needsUpdate = true; },{signal});
  }
  model.traverse(object => { if (object.isMesh) meshes.push(object); });
  for (const mesh of meshes) {
    if (mesh.name.startsWith('Ink_contour') || mesh.name.startsWith('Ink contour')) {
      mesh.material = softInk;
      continue;
    }
    const tape = tapeInk && /cloth tape|tape corner/i.test(mesh.name.replaceAll('_',' '));
    mesh.material = tape ? tapeInk : paper;
    if (tape && inkTexture) {
      const position = mesh.geometry.attributes.position;
      const uv = new Float32Array(position.count*2);
      const point = new THREE.Vector3();
      for (let i=0;i<position.count;i++) {
        point.fromBufferAttribute(position,i);
        model.worldToLocal(mesh.localToWorld(point));
        uv[i*2] = (point.x+.70)/.55;
        uv[i*2+1] = (.28-point.z)/.56;
      }
      mesh.geometry.setAttribute('uv',new THREE.BufferAttribute(uv,2));
    }
    const outline = new THREE.Mesh(mesh.geometry,wash);
    // Lay down the outline first, so the two-sided paper covers its interior.
    outline.renderOrder = -1;
    mesh.add(outline);
    mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,32),edge));
  }
  view.append(renderer.domElement);
  const observer = new ResizeObserver(() => {
    const width = view.clientWidth;
    const height = view.clientHeight;
    if (!width || !height) return;
    const aspect = width/height;
    camera.top = Math.max(clearance,2.1/aspect);
    camera.bottom = -camera.top;
    camera.right = camera.top*aspect;
    camera.left = -camera.right;
    camera.updateProjectionMatrix();
    renderer.setSize(width,height);
    still.hidden = true;
  });
  observer.observe(view);
  const button = view.closest('button');
  let drag;
  let suppressClick = false;
  let yaw = 0;
  let pitch = 0;
  const events = {signal};
  button.classList.add('rotatable');
  button.addEventListener('pointerdown',event => {
    if (!event.isPrimary || event.button !== 0) return;
    suppressClick = false;
    drag = {id:event.pointerId,x:event.clientX,y:event.clientY,moved:false};
  },events);
  button.addEventListener('pointermove',event => {
    if (!drag || event.pointerId !== drag.id) return;
    const dx = event.clientX-drag.x;
    const dy = event.clientY-drag.y;
    if (!drag.moved) {
      if (Math.hypot(dx,dy)<7) return;
      drag.moved = true;
      suppressClick = true;
      button.setPointerCapture(event.pointerId);
      button.classList.add('rotating');
    }
    yaw += dx*.012;
    pitch += dy*.012;
    drag.x = event.clientX;
    drag.y = event.clientY;
  },events);
  function endDrag(event) {
    if (event.pointerId !== drag?.id) return;
    drag = undefined;
    button.classList.remove('rotating');
  }
  for (const type of ['pointerup','pointercancel','lostpointercapture','pointerleave']) {
    button.addEventListener(type,event => {
      if (type === 'pointerleave' && drag?.moved) return;
      endDrag(event);
    },events);
  }
  button.addEventListener('click',event => {
    if (event.detail === 0 || !suppressClick) return;
    event.stopImmediatePropagation();
    event.preventDefault();
    suppressClick = false;
  },{signal,capture:true});
  signal.addEventListener('abort', () => {
    observer.disconnect();
    renderer.setAnimationLoop(null);
    const geometry = new Set();
    model.traverse(object => { if (object.geometry) geometry.add(object.geometry); });
    geometry.forEach(value => value.dispose());
    tapeInk?.dispose();
    inkTexture?.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
  }, {once:true});
  renderer.setAnimationLoop(time => {
    const phase = reduced.matches ? index : time/1500 + index*2;
    pivot.rotation.set(pitch+.18+.10*Math.cos(phase),yaw+.28*Math.sin(phase),[-.28,.15,-.15][index]);
    pivot.position.y = .13*Math.sin(phase);
    renderer.render(scene,camera);
  });
}


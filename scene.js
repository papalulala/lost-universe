import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/GLTFLoader.js';

const loader = new GLTFLoader();
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const paper = new THREE.MeshBasicMaterial({color:0xfffefa});
const softInk = new THREE.MeshBasicMaterial({color:0x666c66});
const edge = new THREE.LineBasicMaterial({color:0x272a28,transparent:true,opacity:.77});
const wash = new THREE.ShaderMaterial({
  side:THREE.BackSide,
  vertexShader:`
    void main() {
      vec3 ink = position + normal * (0.012 + 0.008 * sin(position.x*13.0 + position.z*9.0));
      gl_Position = projectionMatrix * modelViewMatrix * vec4(ink,1.0);
    }`,
  fragmentShader:`void main() { gl_FragColor = vec4(0.15,0.16,0.15,1.0); }`
});

export async function floatModel(view, still, id, index, signal, refined) {
  if (signal.aborted) return;
  const {scene:model} = await loader.loadAsync('./'+id+'.glb'+(refined ? '?v=paper-objects' : ''));
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
  model.position.sub(bounds.getCenter(new THREE.Vector3()));
  if (id === 'film') orientation.rotation.y = Math.PI;
  else orientation.rotation.x = Math.PI/2;
  const meshes = [];
  model.traverse(object => { if (object.isMesh) meshes.push(object); });
  for (const mesh of meshes) {
    if (mesh.name.startsWith('Ink_contour') || mesh.name.startsWith('Ink contour')) {
      mesh.material = softInk;
      continue;
    }
    mesh.material = paper;
    mesh.add(new THREE.Mesh(mesh.geometry,wash));
    mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry,32),edge));
  }
  view.append(renderer.domElement);
  const observer = new ResizeObserver(() => {
    const width = view.clientWidth;
    const height = view.clientHeight;
    if (!width || !height) return;
    camera.top = 2.1*height/width;
    camera.bottom = -camera.top;
    camera.updateProjectionMatrix();
    renderer.setSize(width,height);
    still.hidden = true;
  });
  observer.observe(view);
  signal.addEventListener('abort', () => {
    observer.disconnect();
    renderer.setAnimationLoop(null);
    const geometry = new Set();
    model.traverse(object => { if (object.geometry) geometry.add(object.geometry); });
    geometry.forEach(value => value.dispose());
    renderer.dispose();
    renderer.forceContextLoss();
  }, {once:true});
  renderer.setAnimationLoop(time => {
    const phase = reduced.matches ? index : time/1500 + index*2;
    pivot.rotation.set(.18+.10*Math.cos(phase),.28*Math.sin(phase),[-.28,.15,-.15][index]);
    pivot.position.y = .13*Math.sin(phase);
    renderer.render(scene,camera);
  });
}


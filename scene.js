import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/GLTFLoader.js';

export function createScene(view, still, hint) {
  const renderer = new THREE.WebGLRenderer({alpha:true,antialias:true});
  renderer.setPixelRatio(Math.min(devicePixelRatio,2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  view.append(renderer.domElement);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(37,1,.1,60);
  camera.position.z = 5.6;
  const pivot = new THREE.Group();
  scene.add(pivot,new THREE.HemisphereLight(0xffecd9,0x9190ff,2.5));
  for (const [color,power,x,y,z] of [[0xffd3ac,4,3,4,5],[0x978aff,5,-4,2,-3]]) {
    const light = new THREE.DirectionalLight(color,power);
    light.position.set(x,y,z);
    scene.add(light);
  }
  const coords = [];
  for (let i=0;i<420;i++) coords.push((Math.random()-.5)*23,(Math.random()-.5)*16,-2-Math.random()*12);
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(coords,3));
  scene.add(new THREE.Points(geometry,new THREE.PointsMaterial({color:0xeccbd7,size:.032,transparent:true,opacity:.68})));
  const loader = new GLTFLoader();
  const models = new Map();
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let request = 0;
  let back = false;
  let angle = 0;
  let drag;
  const resize = () => {
    const {clientWidth:w,clientHeight:h} = view;
    if (!w || !h) return;
    camera.aspect = w/h;
    camera.position.z = Math.max(5.4,4.45/camera.aspect);
    camera.updateProjectionMatrix();
    renderer.setSize(w,h);
  };
  new ResizeObserver(resize).observe(view);
  resize();
  const canvas = renderer.domElement;
  canvas.addEventListener('pointerdown',e => {
    drag = e.clientX;
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove',e => {
    if (drag === undefined) return;
    angle += (e.clientX-drag)*.012;
    drag = e.clientX;
  });
  canvas.addEventListener('lostpointercapture',() => { drag = undefined; });
  renderer.setAnimationLoop(time => {
    const t = reduced.matches ? 0 : time/1000;
    const target = angle + (back ? Math.PI : 0) + Math.sin(t*.65)*.2;
    pivot.rotation.set(.14 + Math.sin(t)*.055,
      reduced.matches ? target : THREE.MathUtils.lerp(pivot.rotation.y,target,.09),-.21);
    pivot.position.y = Math.sin(t*1.25)*.12;
    renderer.render(scene,camera);
  });
  return {
    flip(value) { back = value; angle = 0; },
    async show(id) {
      const token = ++request;
      angle = 0;
      pivot.clear();
      still.hidden = false;
      hint.textContent = '正在接收物件影像';
      try {
        if (!models.has(id)) {
          models.set(id,loader.loadAsync('./'+id+'.glb').then(({scene:model}) => {
            const bounds = new THREE.Box3().setFromObject(model);
            model.position.sub(bounds.getCenter(new THREE.Vector3()));
            const group = new THREE.Group();
            group.add(model);
            if (id !== 'film') group.rotation.x = Math.PI/2;
            else group.rotation.y = Math.PI;
            return group;
          }).catch(error => { models.delete(id); throw error; }));
        }
        const model = await models.get(id);
        if (token !== request) return;
        pivot.add(model);
        still.hidden = true;
        hint.textContent = '拖曳旋轉物件';
      } catch {
        if (token === request) hint.textContent = '失物影像';
      }
    }
  };
}



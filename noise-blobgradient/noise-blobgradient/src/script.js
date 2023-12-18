console.clear();

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x3d0764, 20, 25)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setClearColor(0x3d0764);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 25;
const controls = new THREE.OrbitControls(camera, renderer.domElement);

/* Global lightning  */
const light = new THREE.HemisphereLight(0xffffbb, 0x151515, 1);
scene.add(light);

/* Moving light */
const plight = new THREE.PointLight(0xffffff, 1, 40);
plight.position.z = 30;
let lGroup = new THREE.Group();
lGroup.add(plight);
scene.add(lGroup);

const colours = chroma.scale(['#A947F2', '#FF29BD', '#FF5286', '#FF905C', '#FFC84F', '#F9F871']);

let geometry = new THREE.IcosahedronGeometry(4, 40);
let material = new THREE.MeshPhongMaterial({
  wireframe: false,
  vertexColors: true
});
let blob = new THREE.Mesh(geometry, material);
scene.add(blob);
noise.seed(Math.random() * 100);

let v = new THREE.Vector3();
const count = geometry.attributes.position.count;
let center = new THREE.Vector3(1,-1,1);
geometry.setAttribute('color', new THREE.BufferAttribute(new Float32Array(count * 3), 3) );
for (let i = 0; i < geometry.attributes.position.count * 3; i += 3) {
  v.x = geometry.attributes.position.array[i];
  v.y = geometry.attributes.position.array[i + 1];
  v.z = geometry.attributes.position.array[i + 2];
  let angle = center.angleTo(v) / Math.PI;
  geometry.attributes.color.array[i] = colours(angle).rgb()[0] / 255;
  geometry.attributes.color.array[i + 1] = colours(angle).rgb()[1] / 255;
  geometry.attributes.color.array[i + 2] = colours(angle).rgb()[2] / 255;
}
let origin = geometry.attributes.position.clone();
function updateGeom (seed) {
  for (let i = 0; i < geometry.attributes.position.count * 3; i += 3) {
    v.x = origin.array[i];
    v.y = origin.array[i + 1];
    v.z = origin.array[i + 2];
    let n = 2;
    n += noise.simplex3(v.x * 0.2, v.y * 0.2, v.z * 0.2 + seed);
    v.multiplyScalar(n);
    geometry.attributes.position.array[i] = v.x;
    geometry.attributes.position.array[i + 1] = v.y;
    geometry.attributes.position.array[i + 2] = v.z;
  }
  geometry.attributes.position.needsUpdate = true;
}
updateGeom(0);

function render(a) {
  requestAnimationFrame(render);
  
  updateGeom(a * 0.0001);
  lGroup.rotation.x = a * 0.001;
  lGroup.rotation.y = a * 0.001;
  lGroup.rotation.z = -a * 0.001;
  renderer.render(scene, camera);
}
requestAnimationFrame(render);

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight );
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});


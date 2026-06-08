import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { initNavigation, updateNavigation } from './navigation.js';


/* SCENE */
const scene = new THREE.Scene();

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

/* RAYCAST */
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

/* RESPONSIVE */
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/* RENDERER */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

/* LIGHTS */
const pointLightCam = new THREE.PointLight(0xffffff, 150);
pointLightCam.position.set(0, 5, 5);
scene.add(pointLightCam);

/* CONTROLS */
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableRotate = false;
controls.enablePan = false;
controls.enableZoom = false;
window.app3D = { camera, controls };

/* NAVIGATION */
initNavigation(camera, controls);


/* GROUND */
const groundGeometry = new THREE.PlaneGeometry(10, 10);
const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x222222, side: THREE.DoubleSide });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);

ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;

scene.add(ground);

/* TABLE FRONT */
const tableFrontGeometry = new THREE.BoxGeometry(3, 1, 1);
const tableFrontMaterial = new THREE.MeshStandardMaterial({ color: 0x11db94 });
const tableFront = new THREE.Mesh(tableFrontGeometry, tableFrontMaterial);

tableFront.receiveShadow = true;
tableFront.position.y = 0.5;
tableFront.position.z = -4.5;

scene.add(tableFront);

/* CUBE FRONT */
const targetFrontGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const targetFrontMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const targetFront = new THREE.Mesh(targetFrontGeometry, targetFrontMaterial);

targetFront.receiveShadow = true;
targetFront.position.y = 1.25;
targetFront.position.z = -4.5;

scene.add(targetFront);

/* TABLE LEFT */
const tableLeftGeometry = new THREE.BoxGeometry(1, 1, 3);
const tableLeftMaterial = new THREE.MeshStandardMaterial({ color: 0x11db94 });
const tableLeft = new THREE.Mesh(tableLeftGeometry, tableLeftMaterial);

tableLeft.receiveShadow = true;
tableLeft.position.y = 0.5;
tableLeft.position.x = -4.5;

scene.add(tableLeft);

/* CUBE LEFT */
const targetLeftGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const targetLeftMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const targetLeft = new THREE.Mesh(targetLeftGeometry, targetLeftMaterial);

targetLeft.receiveShadow = true;
targetLeft.position.y = 1.25;
targetLeft.position.x = -4.5;

scene.add(targetLeft);


/* TABLE RIGHT */
const tableRightGeometry = new THREE.BoxGeometry(1, 1, 3);
const tableRightMaterial = new THREE.MeshStandardMaterial({ color: 0x11db94 });
const tableRight = new THREE.Mesh(tableRightGeometry, tableRightMaterial);

tableRight.receiveShadow = true;
tableRight.position.y = 0.5;
tableRight.position.x = 4.5;

scene.add(tableRight);

/* CUBE RIGHT */
const targetRightGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
const targetRightMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 });
const targetRight = new THREE.Mesh(targetRightGeometry, targetRightMaterial);

targetRight.receiveShadow = true;
targetRight.position.y = 1.25;
targetRight.position.x = 4.5;

scene.add(targetRight);

/* ANIMATION LOOP */
function animate() {
  requestAnimationFrame(animate);
  updateNavigation();
  controls.update();
  renderer.render(scene, camera);
}

animate();

/* Event On Click on Cubes */

targetLeft.name = "CubeLeft";
targetRight.name = "CubeRight";
targetFront.name = "CubeFront";

window.addEventListener("click", (e) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  const intersects = raycaster.intersectObjects([
    targetLeft,
    targetRight,
    targetFront,
  ]);

  if (intersects.length > 0) {
    const object = intersects[0].object;
    console.log(object.name + " is clicked");
  }
});
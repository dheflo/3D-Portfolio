import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

/* SCENE */
const scene = new THREE.Scene();

/* CAMERA */
const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 5, 5);
camera.lookAt(0, 0, 0);

/* RENDERER */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

/* CONTROLS */
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);

/* KEYBOARD */
const keys = {};
const speed = 0.05;

window.addEventListener('keydown', (e) => {
  keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
  keys[e.code] = false;
});

/* GROUND */
const groundGeometry = new THREE.PlaneGeometry(10, 10);

const groundMaterial = new THREE.MeshStandardMaterial({
  color: 0x222222,
  side: THREE.DoubleSide
});

const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.receiveShadow = true;
scene.add(ground);


/* SPHERE */
const sphereGeometry = new THREE.SphereGeometry(1,32,16,0,Math.PI*2,0,Math.PI);
const sphereMaterial = new THREE.MeshStandardMaterial({color: 0x000000,});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.y = 1;
sphere.castShadow = true;
scene.add(sphere);

/* Table front */
const tableFrontGeometry = new THREE.BoxGeometry(3,1,1);
const tableFrontMaterial = new THREE.MeshStandardMaterial({color: 0x11db94});
const tableFront = new THREE.Mesh(tableFrontGeometry,tableFrontMaterial);
tableFront.receiveShadow = true;
tableFront.position.y = 0.5;
tableFront.position.z = -4.5;
scene.add(tableFront);

/* Table left */
const tableLeftGeometry = new THREE.BoxGeometry(1,1,3);
const tableLeftMaterial = new THREE.MeshStandardMaterial({color: 0x11db94});
const tableLeft = new THREE.Mesh(tableLeftGeometry,tableLeftMaterial);
tableLeft.receiveShadow = true;
tableLeft.position.y = 0.5;
tableLeft.position.x = -4.5;
scene.add(tableLeft);

/* Table right */
const tableRightGeometry = new THREE.BoxGeometry(1,1,3);
const tableRightMaterial = new THREE.MeshStandardMaterial({color: 0x11db94});
const tableRight = new THREE.Mesh(tableRightGeometry,tableRightMaterial);
tableRight.receiveShadow = true;
tableRight.position.y = 0.5;
tableRight.position.x = 4.5;
scene.add(tableRight);



/* LIGHT */
const pointLightCam = new THREE.PointLight(0xffffff, 1000);
pointLightCam.position.set(0, 5, 5);
pointLightCam.castShadow = true;
scene.add(pointLightCam);

const pointLightTop = new THREE.PointLight(0xffffff, 600);
pointLightTop.position.set(2, 5, 5);
pointLightTop.castShadow = true;
scene.add(pointLightTop);

const pointLightBack = new THREE.PointLight(0xffffff, 300);
pointLightBack.position.set(-5, 5, -5);
pointLightBack.castShadow = true;
scene.add(pointLightBack);


/* MOVEMENT */
function moveCamera() {
  const forward = new THREE.Vector3();
  camera.getWorldDirection(forward);
  forward.normalize();

  const right = new THREE.Vector3();
  right.crossVectors(forward, camera.up).normalize();

  if (keys['KeyW']) {
    camera.position.add(forward.clone().multiplyScalar(speed));
    controls.target.add(forward.clone().multiplyScalar(speed));
  }

  if (keys['KeyS']) {
    camera.position.add(forward.clone().multiplyScalar(-speed));
    controls.target.add(forward.clone().multiplyScalar(-speed));
  }

  if (keys['KeyA']) {
    camera.position.add(right.clone().multiplyScalar(-speed));
    controls.target.add(right.clone().multiplyScalar(-speed));
  }

  if (keys['KeyD']) {
    camera.position.add(right.clone().multiplyScalar(speed));
    controls.target.add(right.clone().multiplyScalar(speed));
  }
}

/* ANIMATION LOOP */
function animate(t = 0) {
  requestAnimationFrame(animate);

  moveCamera();

  sphere.rotation.y = t * 0.0001;
  sphere.rotation.x = t * 0.00005;

  controls.update();
  renderer.render(scene, camera);
}

animate();
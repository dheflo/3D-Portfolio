import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(window.innerWidth,window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 5, 2);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

/* ORBIT CONTROL*/
const controls = new OrbitControls(camera, renderer.domElement);

/* SPHERE */
const geometry = new THREE.IcosahedronGeometry(1,4);
const material = new THREE.MeshStandardMaterial({color: 0x0000ff, flatShading: true});
const sphere = new THREE.Mesh(geometry,material);
sphere.castShadow = true;
scene.add(sphere);

sphere.position.y = 3;

/* GROUND */
const groundGeo = new THREE.PlaneGeometry(10,10);
const groundMat = new THREE.MeshStandardMaterial({color: 0x222222, side: THREE.DoubleSide});
const ground = new THREE.Mesh(groundGeo, groundMat)
ground.receiveShadow = true;
scene.add(ground);

ground.rotation.x = Math.PI/2;

const directionalLight = new THREE.DirectionalLight(0xff0000, 100);
directionalLight.castShadow = true;
directionalLight.position.set(0, 10, 0);
scene.add(directionalLight);

function animate(t = 0){
  requestAnimationFrame(animate);
  sphere.rotation.y = t * 0.0001;
  sphere.rotation.x = t * 0.00005;
  renderer.render(scene,camera);
}

animate();

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

/*camera start position */
camera.position.set(0, 1, 5);
//camera.lookAt(0, 0, 0);

/* ANCHORS */
const anchors = {
  home : {
    position: new THREE.Vector3(2,1,5),
    target: new THREE.Vector3(0,1,0)
  },
  uxui :
  {
    position: new THREE.Vector3(0.1, 1.4, -3.8),
    target : new THREE.Vector3(0, 1.25,-4.5)
  },
  work : {
    position : new THREE.Vector3(-3.1, 1.6, 0.3),
    target : new THREE.Vector3(-4.2, 1.3,0)
  },
  about :
  {
    position : new THREE.Vector3(-3.7, 2.2, -0.01),
    target : new THREE.Vector3(-4.2, 1.3, 0)
  }
}

/* RENDERER */
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

/* CONTROLS */
const controls = new OrbitControls(camera, renderer.domElement);
//controls.target.set(0, 0, 0);

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

/* Table front */
const tableFrontGeometry = new THREE.BoxGeometry(3,1,1);
const tableFrontMaterial = new THREE.MeshStandardMaterial({color: 0x11db94});
const tableFront = new THREE.Mesh(tableFrontGeometry,tableFrontMaterial);
tableFront.receiveShadow = true;
tableFront.position.y = 0.5;
tableFront.position.z = -4.5;
scene.add(tableFront);

/* Target front */
const targetFrontGeometry = new THREE.BoxGeometry(0.5,0.5,0.5);
const targetFrontMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
const targetFront = new THREE.Mesh(targetFrontGeometry,targetFrontMaterial);
targetFront.receiveShadow = true;
targetFront.position.y = 1.25;
targetFront.position.z = -4.5;
console.log(targetFront.position);
scene.add(targetFront);

/* Table left */
const tableLeftGeometry = new THREE.BoxGeometry(1,1,3);
const tableLeftMaterial = new THREE.MeshStandardMaterial({color: 0x11db94});
const tableLeft = new THREE.Mesh(tableLeftGeometry,tableLeftMaterial);
tableLeft.receiveShadow = true;
tableLeft.position.y = 0.5;
tableLeft.position.x = -4.5;
scene.add(tableLeft);

/* Target left */
const targetLeftGeometry = new THREE.BoxGeometry(0.5,0.5,0.5);
const targetLeftMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
const targetLeft = new THREE.Mesh(targetLeftGeometry,targetLeftMaterial);
targetLeft.receiveShadow = true;
targetLeft.position.y = 1.25;
targetLeft.position.x = -4.5;
console.log(targetLeft.position)
scene.add(targetLeft);

/* Table right */
const tableRightGeometry = new THREE.BoxGeometry(1,1,3);
const tableRightMaterial = new THREE.MeshStandardMaterial({color: 0x11db94});
const tableRight = new THREE.Mesh(tableRightGeometry,tableRightMaterial);
tableRight.receiveShadow = true;
tableRight.position.y = 0.5;
tableRight.position.x = 4.5;
scene.add(tableRight);

/* Target right */
const targetRightGeometry = new THREE.BoxGeometry(0.5,0.5,0.5);
const targetRightMaterial = new THREE.MeshStandardMaterial({color: 0xff0000});
const targetRight = new THREE.Mesh(targetRightGeometry,targetRightMaterial);
targetRight.receiveShadow = true;
targetRight.position.y = 1.25;
targetRight.position.x = 4.5;
console.log(targetRight.position)
scene.add(targetRight);



/* LIGHT */
const pointLightCam = new THREE.PointLight(0xffffff, 150);
pointLightCam.position.set(0, 5, 5);
pointLightCam.castShadow = false;
scene.add(pointLightCam);

const pointLightTop = new THREE.PointLight(0xffffff, 150);
pointLightTop.position.set(2, 5, 5);
pointLightTop.castShadow = false;
scene.add(pointLightTop);

const pointLightBack = new THREE.PointLight(0xffffff, 150);
pointLightBack.position.set(-5, 5, -5);
pointLightBack.castShadow = false;
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
function animate(t = 2) {
  requestAnimationFrame(animate);

  moveCamera();
  //console.log(camera.position)
  controls.update();
  renderer.render(scene, camera);
}
animate()

/* CAMERA MOVE WITH NAV ANCHORS*/
document.getElementById('home').addEventListener('click', () => {
    camera.position.copy(anchors.home.position);
    controls.target.copy(anchors.home.target);
  });

document.getElementById('uxui').addEventListener('click', () => {
    camera.position.copy(anchors.uxui.position);
    controls.target.copy(anchors.uxui.target);
    controls.update();
  });

  document.getElementById('about').addEventListener('click', () => {
    camera.position.copy(anchors.about.position);
    controls.target.copy(anchors.about.target);
    controls.update();
  });

    document.getElementById('work').addEventListener('click', () => {
    camera.position.copy(anchors.work.position);
    controls.target.copy(anchors.work.target);
    controls.update();
  });
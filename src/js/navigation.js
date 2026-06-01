import * as THREE from 'three';

const anchors = {
  home: {
    position: new THREE.Vector3(2, 1, 5),
    target: new THREE.Vector3(0, 1, 0)
  },

  uxui: {
    position: new THREE.Vector3(0.1, 1.4, -3.8),
    target: new THREE.Vector3(0, 1.25, -4.5)
  },

  work: {
    position: new THREE.Vector3(3.1, 1.6, 0.3),
    target: new THREE.Vector3(4.2, 1.6, 0)
  },

  about: {
    position: new THREE.Vector3(-3.7, 2.2, -0.01),
    target: new THREE.Vector3(-4.2, 1.3, 0)
  }
};

let camera = null;
let controls = null;
let currentViewpoint = null;

const animationSpeed = 0.04;

export function initNavigation(cameraParam, controlsParam) {
  camera = cameraParam;
  controls = controlsParam;

  camera.position.copy(anchors.home.position);
  controls.target.copy(anchors.home.target);
  controls.update();

  document.getElementById('home').addEventListener('click', () => {
    goToViewpoint('home');
  });

  document.getElementById('uxui').addEventListener('click', () => {
    goToViewpoint('uxui');
  });

  document.getElementById('work').addEventListener('click', () => {
    goToViewpoint('work');
  });

  document.getElementById('about').addEventListener('click', () => {
    goToViewpoint('about');
  });
}

export function goToViewpoint(name) {
  currentViewpoint = anchors[name];
}

export function updateNavigation() {
  if (!currentViewpoint) return;

  camera.position.lerp(currentViewpoint.position, animationSpeed);
  controls.target.lerp(currentViewpoint.target, animationSpeed);

  const distance = camera.position.distanceTo(currentViewpoint.position);

  if (distance < 0.01) {
    camera.position.copy(currentViewpoint.position);
    controls.target.copy(currentViewpoint.target);
    currentViewpoint = null;
  }
}
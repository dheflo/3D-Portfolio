import * as THREE from 'three';

const app = window.app3D;

if (!app || !app.camera || !app.controls) {
  console.warn('Player controller impossible to find.');
} else {
  const { camera, controls } = app;

  controls.enableRotate = true;
  controls.enablePan = true;
  controls.enableZoom = true;
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;

  const keys = {};
  const speed = 0.05;

  window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
  });

  window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
  });

  function updatePlayerController() {
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

    requestAnimationFrame(updatePlayerController);
  }

  updatePlayerController();
}
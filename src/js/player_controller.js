import * as THREE from 'three';

const keys = {};
const speed = 0.05;

function initPlayerController() {
  const app = window.app3D;

  if (!app || !app.camera || !app.controls) {
    console.warn('Player controller: camera ou controls introuvable.');
    return;
  }

  const { camera, controls } = app;

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

    if (keys['KeyZ']) {
      camera.position.add(forward.clone().multiplyScalar(speed));
      controls.target.add(forward.clone().multiplyScalar(speed));
    }

    if (keys['KeyS']) {
      camera.position.add(forward.clone().multiplyScalar(-speed));
      controls.target.add(forward.clone().multiplyScalar(-speed));
    }

    if (keys['KeyQ']) {
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

initPlayerController();
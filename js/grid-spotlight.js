document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  container.appendChild(renderer.domElement);

  const geometry = new THREE.PlaneGeometry(200, 100, 1, 1);

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uGridColor: { value: new THREE.Color('#FF2E2E') },
      uGridThickness: { value: 0.05 }
    },
    vertexShader: `
      varying vec2 vUv;

      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uGridColor;
      uniform float uGridThickness;
      varying vec2 vUv;

      void main() {
        float gridX = step(1.0 - uGridThickness, fract(vUv.x * 80.0));
        float gridY = step(1.0 - uGridThickness, fract(vUv.y * 40.0));

        float grid = max(gridX, gridY);
        float alpha = grid * 0.3;

        gl_FragColor = vec4(uGridColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  camera.position.z = 30;

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }

  animate();
});

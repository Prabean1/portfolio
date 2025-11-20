document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  // Scene setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for high DPI
  container.appendChild(renderer.domElement);

  // Grid Parameters
  const gridSize = 80; // Number of grid cells

  // Geometry
  // High segment count for smooth distortion
  const geometry = new THREE.PlaneGeometry(200, 100, gridSize, gridSize / 2);

  // Shader Material
  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uGridColor: { value: new THREE.Color('#FF2E2E') }, // Accent Red
      uGridThickness: { value: 0.05 },
      uDistortionAmount: { value: 1.0 } // 1.0 = full distortion, 0.0 = none
    },
    vertexShader: `
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uDistortionAmount;
      varying vec2 vUv;
      varying float vDist;

      void main() {
        vUv = uv;
        
        vec3 pos = position;
        
        // Calculate distance from mouse (in world space approx) to vertex
        // We map mouse -1 to 1 to world coordinates roughly
        vec2 mouseWorld = uMouse * vec2(100.0, 50.0); // Scale to plane size
        float dist = distance(pos.xy, mouseWorld);
        
        vDist = dist;

        // Distortion effect
        float force = max(0.0, 15.0 - dist) * 0.5 * uDistortionAmount;
        pos.z += force * sin(dist * 0.5 - uTime * 2.0);
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uGridColor;
      uniform float uGridThickness;
      uniform float uDistortionAmount;
      varying vec2 vUv;
      varying float vDist;

      void main() {
        // Create grid pattern
        float gridX = step(1.0 - uGridThickness, fract(vUv.x * 80.0));
        float gridY = step(1.0 - uGridThickness, fract(vUv.y * 40.0));
        
        float grid = max(gridX, gridY);
        
        // Fade out grid based on distance from center/mouse for effect
        float alpha = grid * 0.3; // Base opacity
        
        // Highlight near mouse (scaled by distortion amount)
        float highlight = (max(0.0, 15.0 - vDist) / 15.0) * uDistortionAmount;
        alpha += grid * highlight * 0.7;

        gl_FragColor = vec4(uGridColor, alpha);
      }
    `,
    transparent: true,
    side: THREE.DoubleSide
  });

  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  camera.position.z = 30;

  // Mouse interaction
  const mouse = new THREE.Vector2();
  const targetMouse = new THREE.Vector2();

  window.addEventListener('mousemove', (event) => {
    // Normalize mouse to -1 to 1
    targetMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    targetMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // Toggle Interaction
  const toggle = document.getElementById('distortionToggle');
  if (toggle) {
    // Initialize based on current state (Low Perf Mode checked = 0.0)
    material.uniforms.uDistortionAmount.value = toggle.checked ? 0.0 : 1.0;

    toggle.addEventListener('change', (e) => {
      // Inverted logic: Checked (Low Perf) = 0.0, Unchecked = 1.0
      const targetValue = e.target.checked ? 0.0 : 1.0;

      const startValue = material.uniforms.uDistortionAmount.value;
      const startTime = performance.now();
      const duration = 500;

      function animateToggle(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1.0);
        const ease = 1 - Math.pow(1 - progress, 3);

        material.uniforms.uDistortionAmount.value = startValue + (targetValue - startValue) * ease;

        if (progress < 1.0) {
          requestAnimationFrame(animateToggle);
        }
      }
      requestAnimationFrame(animateToggle);
    });
  }

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    material.uniforms.uTime.value = elapsedTime;

    // Smooth mouse movement
    mouse.lerp(targetMouse, 0.1);
    material.uniforms.uMouse.value.copy(mouse);

    renderer.render(scene, camera);
  }

  animate();
});

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Optimize for high DPI
  container.appendChild(renderer.domElement);

  const gridSize = 80; // Number of grid cells

  const geometry = new THREE.PlaneGeometry(200, 100, 1, 1);


  const material = new THREE.ShaderMaterial({
    uniforms: {
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uGridColor: { value: new THREE.Color('#FF2E2E') },
      uGridThickness: { value: 0.05 },
      uSpotlightEnabled: { value: 1.0 }
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
      uniform float uSpotlightEnabled;
      uniform vec2 uMouse;
      uniform vec2 uResolution;
      varying vec2 vUv;

      void main() {
        // Create grid pattern
        float gridX = step(1.0 - uGridThickness, fract(vUv.x * 80.0));
        float gridY = step(1.0 - uGridThickness, fract(vUv.y * 40.0));
        
        float grid = max(gridX, gridY);
        
        // Fade out grid based on distance from center/mouse for effect
        float alpha = grid * 0.3; // Base opacity
        
        // Calculate distance from mouse to current pixel
        // Map mouse from -1..1 to 0..1 to match UV space
        vec2 mouseUv = uMouse * 0.5 + 0.5;
        
        // Adjust aspect ratio for distance calculation
        float aspect = uResolution.x / uResolution.y;
        vec2 distVec = vUv - mouseUv;
        distVec.x *= aspect;
        
        float dist = length(distVec);
        
        // Highlight near mouse
        float highlight = max(0.0, 0.3 - dist) / 0.3; // 0.3 radius
        alpha += grid * highlight * 0.7 * uSpotlightEnabled;

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


  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  });

  // Performance monitoring variables
  let lastTime = 0;
  let frameCount = 0;
  let lowFpsDuration = 0;
  let isOptimized = false;

  // Animation Loop
  function animate(time) {
    requestAnimationFrame(animate);

    // Smooth mouse movement
    mouse.lerp(targetMouse, 0.1);
    material.uniforms.uMouse.value.copy(mouse);

    renderer.render(scene, camera);

    // Monitor Performance
    if (!isOptimized && time) {
      if (lastTime === 0) {
        lastTime = time;
      } else {
        frameCount++;
        const delta = time - lastTime;

        if (delta >= 1000) {
          // Skip check if tab was inactive or frame dropped significantly
          if (delta > 2500) {
            frameCount = 0;
            lastTime = time;
            return;
          }

          const fps = (frameCount * 1000) / delta;

          if (fps < 40) {
            lowFpsDuration += delta;
          } else {
            lowFpsDuration = 0;
          }

          if (lowFpsDuration > 3000) {
            renderer.setPixelRatio(0.8); // Reduce pixel ratio for better performance
            isOptimized = true;
            console.log("Performance adjustment: Reduced pixel ratio to 0.8 due to low FPS.");
          }

          frameCount = 0;
          lastTime = time;
        }
      }
    }
  }

  animate();

  // --- Spotlight Toggle Logic ---
  const toggle = document.getElementById('gridSpotlightToggle');

  // 1. Read from localStorage (default to 'true' if not set)
  const storedSetting = localStorage.getItem('gridSpotlightEnabled');
  const isEnabled = storedSetting === null ? true : (storedSetting === 'true');

  // 2. Set initial state
  material.uniforms.uSpotlightEnabled.value = isEnabled ? 1.0 : 0.0;
  if (toggle) {
    toggle.checked = isEnabled;
  }

  // 3. Handle toggle changes
  if (toggle) {
    toggle.addEventListener('change', (e) => {
      const checked = e.target.checked;
      material.uniforms.uSpotlightEnabled.value = checked ? 1.0 : 0.0;
      localStorage.setItem('gridSpotlightEnabled', checked);
    });
  }
});


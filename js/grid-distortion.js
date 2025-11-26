document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('canvas-container');
  if (!container) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Optimize for high DPI
  container.appendChild(renderer.domElement);

  const gridSize = 80; // Number of grid cells

  const geometry = new THREE.PlaneGeometry(200, 100, 1, 1);


  const material = new THREE.ShaderMaterial({
    uniforms: {
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
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


  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    material.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight);
  });

  // Animation Loop
  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse movement
    mouse.lerp(targetMouse, 0.1);
    material.uniforms.uMouse.value.copy(mouse);

    renderer.render(scene, camera);
  }

  animate();
});


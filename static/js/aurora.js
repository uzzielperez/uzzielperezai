/**
 * Aurora Visualization
 * Interactive 3D visualization of Northern/Southern Lights
 */

function initAurora(container) {
  if (!container || typeof THREE === 'undefined') {
    console.error('Aurora visualization requires Three.js and a valid container');
    return;
  }

  const scene = new THREE.Scene();
  const mousePos = { x: 0, y: 0 };
  let loaded = false;

  const camera = new THREE.PerspectiveCamera(
    60,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 0, 15);

  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: false 
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Dark night sky background
  scene.background = new THREE.Color(0x0a0e27);

  // Ground/horizon
  const groundGeo = new THREE.PlaneGeometry(100, 50);
  const groundMat = new THREE.MeshBasicMaterial({
    color: 0x1a1a2e,
    side: THREE.DoubleSide
  });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.rotation.x = Math.PI / 2;
  ground.position.y = -8;
  scene.add(ground);

  // Stars background
  const starsGeo = new THREE.BufferGeometry();
  const starCount = 2000;
  const starPositions = new Float32Array(starCount * 3);
  const starSizes = new Float32Array(starCount);
  
  for (let i = 0; i < starCount * 3; i += 3) {
    const radius = 30 + Math.random() * 50;
    const theta = Math.random() * Math.PI * 2;
    const phi = (Math.random() - 0.5) * Math.PI * 0.5;
    
    starPositions[i] = radius * Math.cos(phi) * Math.cos(theta);
    starPositions[i + 1] = radius * Math.sin(phi);
    starPositions[i + 2] = radius * Math.cos(phi) * Math.sin(theta);
    
    starSizes[i / 3] = Math.random() * 2 + 0.5;
  }
  
  starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  starsGeo.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));
  
  const starsMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.15,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true
  });
  const stars = new THREE.Points(starsGeo, starsMat);
  scene.add(stars);

  // Aurora curtains - multiple layers
  const auroraCurtains = [];
  const curtainCount = 8;
  
  for (let i = 0; i < curtainCount; i++) {
    const curtainGroup = new THREE.Group();
    
    // Create flowing curtain using particles
    const particlesGeo = new THREE.BufferGeometry();
    const particleCount = 500;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    
    // Color palette: green, blue-green, purple, red
    const colorPalette = [
      new THREE.Color(0x00ff88), // Bright green
      new THREE.Color(0x00d4aa), // Blue-green
      new THREE.Color(0x4a90e2), // Blue
      new THREE.Color(0x9b59b6), // Purple
      new THREE.Color(0xff6b9d), // Pink-red
    ];
    
    const baseColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
    
    for (let j = 0; j < particleCount; j++) {
      const x = (i - curtainCount / 2) * 3 + (Math.random() - 0.5) * 2;
      const y = Math.random() * 15 - 5;
      const z = Math.random() * 2 - 1;
      
      positions[j * 3] = x;
      positions[j * 3 + 1] = y;
      positions[j * 3 + 2] = z;
      
      // Vary colors slightly
      const colorVariation = 0.7 + Math.random() * 0.3;
      colors[j * 3] = baseColor.r * colorVariation;
      colors[j * 3 + 1] = baseColor.g * colorVariation;
      colors[j * 3 + 2] = baseColor.b * colorVariation;
      
      sizes[j] = 0.3 + Math.random() * 0.5;
    }
    
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particlesGeo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    
    const particlesMat = new THREE.PointsMaterial({
      size: 0.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true
    });
    
    const particles = new THREE.Points(particlesGeo, particlesMat);
    curtainGroup.add(particles);
    
    // Add flowing lines/ribbons
    const ribbonPoints = [];
    const ribbonCount = 3;
    
    for (let r = 0; r < ribbonCount; r++) {
      const curvePoints = [];
      const segments = 50;
      
      for (let s = 0; s <= segments; s++) {
        const t = s / segments;
        const x = (i - curtainCount / 2) * 3 + Math.sin(t * Math.PI * 4 + i) * 0.5;
        const y = t * 20 - 10;
        const z = Math.sin(t * Math.PI * 2) * 0.3;
        curvePoints.push(new THREE.Vector3(x, y, z));
      }
      
      const curve = new THREE.CatmullRomCurve3(curvePoints);
      const ribbonGeo = new THREE.TubeGeometry(curve, segments, 0.1, 8, false);
      
      const ribbonMat = new THREE.MeshBasicMaterial({
        color: baseColor,
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      });
      
      const ribbon = new THREE.Mesh(ribbonGeo, ribbonMat);
      curtainGroup.add(ribbon);
    }
    
    auroraCurtains.push({
      group: curtainGroup,
      particles: particles,
      baseY: -5 + Math.random() * 10,
      speed: 0.3 + Math.random() * 0.4,
      wavePhase: Math.random() * Math.PI * 2,
      color: baseColor
    });
    
    scene.add(curtainGroup);
  }

  // Mouse movement for camera
  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mousePos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  container.addEventListener('mousemove', handleMouseMove);

  // Animation loop
  let time = 0;
  
  const animate = () => {
    requestAnimationFrame(animate);
    time += 0.01;

    // Camera movement based on mouse
    camera.position.x += (mousePos.x * 3 - camera.position.x) * 0.05;
    camera.position.y += (mousePos.y * 2 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);

    // Animate aurora curtains
    auroraCurtains.forEach((curtain, i) => {
      const positions = curtain.particles.geometry.attributes.position.array;
      const wave = Math.sin(time * curtain.speed + curtain.wavePhase) * 2;
      
      for (let j = 0; j < positions.length; j += 3) {
        // Create flowing, waving motion
        const originalX = (i - curtainCount / 2) * 3;
        const y = positions[j + 1];
        const waveEffect = Math.sin(y * 0.2 + time * curtain.speed + curtain.wavePhase) * 1.5;
        
        positions[j] = originalX + waveEffect + Math.sin(time * 0.5 + y * 0.1) * 0.5;
        positions[j + 1] += Math.sin(time * 0.3 + j * 0.01) * 0.02;
        positions[j + 2] = Math.sin(time * 0.4 + y * 0.15) * 0.3;
      }
      
      curtain.particles.geometry.attributes.position.needsUpdate = true;
      
      // Rotate curtain group slightly
      curtain.group.rotation.z = Math.sin(time * 0.2 + i) * 0.1;
    });

    // Gentle star rotation
    stars.rotation.y = time * 0.01;

    // Subtle ground rotation for perspective
    ground.rotation.z = Math.sin(time * 0.1) * 0.02;

    renderer.render(scene, camera);
  };

  animate();
  setTimeout(() => { loaded = true; }, 100);

  // Handle resize
  const handleResize = () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  };

  window.addEventListener('resize', handleResize);

  // Cleanup function
  return () => {
    window.removeEventListener('resize', handleResize);
    if (container) {
      container.removeEventListener('mousemove', handleMouseMove);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    }
    
    renderer.dispose();
  };
}

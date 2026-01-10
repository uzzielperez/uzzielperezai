/**
 * Black Hole Visualization
 * Converted from React component to vanilla JavaScript for Hugo integration
 */

function initBlackHole(container) {
  if (!container || typeof THREE === 'undefined') {
    console.error('Black hole visualization requires Three.js and a valid container');
    return;
  }

  const scene = new THREE.Scene();
  const mousePos = { x: 0, y: 0 };
  let loaded = false;

  const camera = new THREE.PerspectiveCamera(
    75,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.z = 8;

  const renderer = new THREE.WebGLRenderer({ 
    antialias: true, 
    alpha: false 
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Black space background
  scene.background = new THREE.Color(0x000000);

  // Event horizon (black sphere)
  const horizonGeo = new THREE.SphereGeometry(1, 64, 64);
  const horizonMat = new THREE.MeshBasicMaterial({
    color: 0x000000,
    transparent: true,
    opacity: 1
  });
  const horizon = new THREE.Mesh(horizonGeo, horizonMat);
  scene.add(horizon);

  // Inner glow
  const innerGlowGeo = new THREE.SphereGeometry(1.05, 64, 64);
  const innerGlowMat = new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vNormal;
      varying vec3 vPosition;
      void main() {
        float intensity = pow(0.8 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.0);
        vec3 glow = vec3(1.0, 0.3, 0.0) * intensity;
        gl_FragColor = vec4(glow * 0.8, intensity * 0.6);
      }
    `,
    side: THREE.BackSide,
    blending: THREE.AdditiveBlending,
    transparent: true
  });
  const innerGlow = new THREE.Mesh(innerGlowGeo, innerGlowMat);
  scene.add(innerGlow);

  // Accretion disk
  const diskGroup = new THREE.Group();
  const diskParticles = [];
  const particleCount = 3000;
  
  for (let i = 0; i < particleCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.5 + Math.random() * 3;
    const thickness = (Math.random() - 0.5) * 0.3;
    
    const geo = new THREE.SphereGeometry(0.02 + Math.random() * 0.03, 8, 8);
    
    const temp = Math.pow(1 / radius, 0.5);
    const color = new THREE.Color();
    color.setHSL(0.05 + temp * 0.1, 1, 0.5 + temp * 0.3);
    
    const mat = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8
    });
    
    const particle = new THREE.Mesh(geo, mat);
    particle.position.set(
      Math.cos(angle) * radius,
      thickness,
      Math.sin(angle) * radius
    );
    
    diskParticles.push({
      mesh: particle,
      angle: angle,
      radius: radius,
      speed: 0.5 / Math.pow(radius, 1.5),
      thickness: thickness,
      color: color
    });
    
    diskGroup.add(particle);
  }
  scene.add(diskGroup);

  // Background stars
  const starsGeo = new THREE.BufferGeometry();
  const starCount = 1000;
  const starPositions = new Float32Array(starCount * 3);
  
  for (let i = 0; i < starCount * 3; i += 3) {
    const radius = 20 + Math.random() * 80;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    
    starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
    starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
    starPositions[i + 2] = radius * Math.cos(phi);
  }
  
  starsGeo.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
  const starsMat = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
    transparent: true,
    opacity: 0.8
  });
  const stars = new THREE.Points(starsGeo, starsMat);
  scene.add(stars);

  // Gravitational lensing effect - light rays
  const rayGroup = new THREE.Group();
  for (let i = 0; i < 20; i++) {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-10, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5),
      new THREE.Vector3(0, (Math.random() - 0.5) * 3, 0),
      new THREE.Vector3(10, (Math.random() - 0.5) * 5, (Math.random() - 0.5) * 5)
    );
    
    const points = curve.getPoints(50);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({
      color: 0x4488ff,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending
    });
    const line = new THREE.Line(geo, mat);
    rayGroup.add(line);
  }
  rayGroup.rotation.y = Math.PI / 4;
  scene.add(rayGroup);

  // Light points escaping
  const escapeParticles = [];
  const createEscapeParticle = () => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 1.8 + Math.random() * 0.5;
    
    const geo = new THREE.SphereGeometry(0.05, 8, 8);
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color().setHSL(0.1, 1, 0.6),
      transparent: true,
      opacity: 1
    });
    
    const particle = new THREE.Mesh(geo, mat);
    particle.position.set(
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 0.2,
      Math.sin(angle) * radius
    );
    
    escapeParticles.push({
      mesh: particle,
      velocity: new THREE.Vector3(
        Math.cos(angle) * 0.02,
        (Math.random() - 0.5) * 0.01,
        Math.sin(angle) * 0.02
      ),
      life: 1
    });
    
    scene.add(particle);
  };

  // Mouse movement
  const handleMouseMove = (e) => {
    const rect = container.getBoundingClientRect();
    mousePos.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mousePos.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  };

  container.addEventListener('mousemove', handleMouseMove);

  // Animation loop
  let time = 0;
  let escapeTimer = 0;
  
  const animate = () => {
    requestAnimationFrame(animate);
    time += 0.01;
    escapeTimer += 0.01;

    // Update shader time
    innerGlowMat.uniforms.time.value = time;

    // Rotate black hole slowly
    horizon.rotation.y = time * 0.1;
    
    // Camera movement based on mouse
    camera.position.x = mousePos.x * 2;
    camera.position.y = mousePos.y * 2;
    camera.lookAt(0, 0, 0);

    // Animate accretion disk
    diskParticles.forEach((p, i) => {
      p.angle += p.speed;
      
      // Spiral inward slowly
      p.radius -= 0.0003;
      
      if (p.radius < 1.2) {
        p.radius = 1.5 + Math.random() * 3;
        p.angle = Math.random() * Math.PI * 2;
      }
      
      p.mesh.position.x = Math.cos(p.angle) * p.radius;
      p.mesh.position.z = Math.sin(p.angle) * p.radius;
      p.mesh.position.y = p.thickness + Math.sin(time * 2 + i) * 0.05;
      
      // Brightness based on velocity
      const brightness = 0.5 + (1 / p.radius) * 0.5;
      p.mesh.material.opacity = brightness;
    });

    // Rotate disk group
    diskGroup.rotation.y = time * 0.05;

    // Create escape particles occasionally
    if (escapeTimer > 0.5) {
      createEscapeParticle();
      escapeTimer = 0;
    }

    // Update escape particles
    for (let i = escapeParticles.length - 1; i >= 0; i--) {
      const p = escapeParticles[i];
      p.mesh.position.add(p.velocity);
      p.life -= 0.01;
      p.mesh.material.opacity = p.life;
      
      if (p.life <= 0) {
        scene.remove(p.mesh);
        p.mesh.geometry.dispose();
        p.mesh.material.dispose();
        escapeParticles.splice(i, 1);
      }
    }

    // Gentle star rotation
    stars.rotation.y = time * 0.01;

    // Animate light rays
    rayGroup.rotation.y = time * 0.05;

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

  // Cleanup function (can be called if needed)
  return () => {
    window.removeEventListener('resize', handleResize);
    if (container) {
      container.removeEventListener('mousemove', handleMouseMove);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    }
    
    escapeParticles.forEach(p => {
      p.mesh.geometry.dispose();
      p.mesh.material.dispose();
    });
    
    renderer.dispose();
  };
}

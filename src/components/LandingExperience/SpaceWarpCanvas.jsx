import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SpaceWarpCanvas({ isWarping }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Particle Stars Geometry
    const count = 1200;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const colors = new Float32Array(count * 3);

    const cyan = new THREE.Color('#22d3ee');
    const purple = new THREE.Color('#a855f7');
    const gold = new THREE.Color('#fbbf24');
    const white = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 80;
      speeds[i] = 0.05 + Math.random() * 0.1;

      const randColor = Math.random();
      let color = white;
      if (randColor > 0.7) color = cyan;
      else if (randColor > 0.4) color = purple;
      else if (randColor > 0.25) color = gold;

      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle Material
    const material = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animationFrameId;
    let currentSpeed = 0.04;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Accelerate speed if warping
      if (isWarping) {
        currentSpeed = THREE.MathUtils.lerp(currentSpeed, 1.2, 0.05);
        material.size = THREE.MathUtils.lerp(material.size, 0.35, 0.05);
      } else {
        currentSpeed = THREE.MathUtils.lerp(currentSpeed, 0.04, 0.05);
      }

      const pos = geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        pos[i * 3 + 2] += speeds[i] * currentSpeed * 10;

        // Reset particle position if it goes past camera
        if (pos[i * 3 + 2] > 10) {
          pos[i * 3 + 2] = -70;
          pos[i * 3] = (Math.random() - 0.5) * 40;
          pos[i * 3 + 1] = (Math.random() - 0.5) * 40;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      particles.rotation.z += 0.001;
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isWarping]);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

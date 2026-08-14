import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function KairosWormhole3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 18;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group for mouse parallax tilt
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Outer Glowing Torus (Chronometer Ring 1)
    const ring1Geo = new THREE.TorusGeometry(7.5, 0.08, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#06b6d4'),
      wireframe: true,
      transparent: true,
      opacity: 0.7,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    mainGroup.add(ring1);

    // 2. Middle Torus (Chronometer Ring 2)
    const ring2Geo = new THREE.TorusGeometry(5.8, 0.12, 16, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#a855f7'),
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = Math.PI / 3;
    mainGroup.add(ring2);

    // 3. Inner Chrono Ring with Nodes
    const ring3Geo = new THREE.TorusGeometry(4.2, 0.06, 16, 60);
    const ring3Mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#fbbf24'),
      wireframe: false,
      transparent: true,
      opacity: 0.9,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.y = Math.PI / 4;
    mainGroup.add(ring3);

    // 4. Central Kairos Singularity Core (Icosahedron Glow)
    const coreGeo = new THREE.IcosahedronGeometry(2.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#22d3ee'),
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 5. Floating Time Fragments (Polyhedrons & Ring shards)
    const fragmentCount = 18;
    const fragmentsGroup = new THREE.Group();
    const fragmentGeometries = [
      new THREE.OctahedronGeometry(0.4),
      new THREE.TetrahedronGeometry(0.5),
      new THREE.DodecahedronGeometry(0.35),
    ];

    const fragMaterials = [
      new THREE.MeshBasicMaterial({ color: '#22d3ee', wireframe: true }),
      new THREE.MeshBasicMaterial({ color: '#a855f7', wireframe: true }),
      new THREE.MeshBasicMaterial({ color: '#fbbf24', wireframe: true }),
    ];

    const fragmentData = [];

    for (let i = 0; i < fragmentCount; i++) {
      const geo = fragmentGeometries[i % fragmentGeometries.length];
      const mat = fragMaterials[i % fragMaterials.length];
      const mesh = new THREE.Mesh(geo, mat);

      const radius = 9 + Math.random() * 6;
      const angle = (i / fragmentCount) * Math.PI * 2;
      mesh.position.x = Math.cos(angle) * radius;
      mesh.position.y = (Math.random() - 0.5) * 6;
      mesh.position.z = Math.sin(angle) * radius * 0.5;

      fragmentsGroup.add(mesh);
      fragmentData.push({
        mesh,
        angle,
        radius,
        rotSpeedX: 0.01 + Math.random() * 0.02,
        rotSpeedY: 0.01 + Math.random() * 0.02,
        orbitSpeed: 0.005 + Math.random() * 0.005,
      });
    }
    mainGroup.add(fragmentsGroup);

    // 6. Cosmic Dust / Star Particles
    const dustCount = 800;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);

    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 45;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));

    const dustMat = new THREE.PointsMaterial({
      size: 0.08,
      color: new THREE.Color('#67e8f9'),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const dustPoints = new THREE.Points(dustGeo, dustMat);
    scene.add(dustPoints);

    // Mouse Interaction Target
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mouse.targetX = (x / width - 0.5) * 2;
      mouse.targetY = -(y / height - 0.5) * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animationId;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Smooth mouse lerp tilt
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      mainGroup.rotation.y = mouse.x * 0.4;
      mainGroup.rotation.x = mouse.y * 0.3;

      // Ring rotations (Counter rotating chronometer)
      ring1.rotation.z += 0.003;
      ring1.rotation.y += 0.002;

      ring2.rotation.z -= 0.005;
      ring2.rotation.x += 0.003;

      ring3.rotation.y += 0.007;

      coreMesh.rotation.x += 0.008;
      coreMesh.rotation.y += 0.01;

      // Orbit fragments
      fragmentData.forEach((frag) => {
        frag.angle += frag.orbitSpeed;
        frag.mesh.position.x = Math.cos(frag.angle) * frag.radius;
        frag.mesh.position.z = Math.sin(frag.angle) * frag.radius * 0.6;
        frag.mesh.rotation.x += frag.rotSpeedX;
        frag.mesh.rotation.y += frag.rotSpeedY;
      });

      dustPoints.rotation.y += 0.0008;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { matrix } from 'mathjs';
import { ellipticDistance, sigmoid } from '../libs/utils';
import { time } from 'console';

const CubeGrid = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Dimensions for the orthographic camera
    const aspectRatio = window.innerWidth / window.innerHeight;
    const frustumSize = 30;
    const frustumHalfSize = frustumSize / 2;
    const camera = new THREE.OrthographicCamera(
      -frustumHalfSize * aspectRatio,
      frustumHalfSize * aspectRatio,
      frustumHalfSize,
      -frustumHalfSize,
      1,
      1000
    );
    camera.position.z = 50;

    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    (mountRef.current! as HTMLElement).appendChild(renderer.domElement);

    const light = new THREE.PointLight(0xffffff, 1000, 1000, 3)
    light.position.set(0, 0, 10)
    scene.add(light)

    const cubes: THREE.Mesh<THREE.BoxGeometry, THREE.MeshPhysicalMaterial, THREE.Object3DEventMap>[] = [];
    const gridSize = 60;
    const spacing = 1.2;
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshPhysicalMaterial({
          opacity: 0.5,
          roughness: 0.5,
          color: 0xffffff,
        });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set((x - gridSize / 2) * spacing, (y - gridSize / 2) * spacing, 0);
        scene.add(cube);
        cubes.push(cube);
      }
    }

    const onWindowResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = -frustumHalfSize * aspect;
      camera.right = frustumHalfSize * aspect;
      camera.top = frustumHalfSize;
      camera.bottom = -frustumHalfSize;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', onWindowResize, false);

    const animate = () => {
      requestAnimationFrame(animate);
    
      // minimal distance from center to edges of window in unit of three.js scene
      const rot = 0.4;
      const time = Date.now() * 0.0005;
      cubes.forEach(cube => {
        const x = matrix([cube.position.x, cube.position.y]);
        const d = ellipticDistance<number>(x, 1.6, 0.8, rot);
        const noise = 0.5 * Math.sin(time + cube.position.x * 0.2) * Math.cos(Math.PI * time + cube.position.y * 0.2) + 0.5;
        const value = d + noise * 200;
        const scale = Math.max(0, 2 * sigmoid(value * 0.01 - 4) - 1);
        
        cube.scale.set(scale, scale, scale);
      });
    
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('resize', onWindowResize);
      (mountRef.current! as HTMLElement).removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100vw', height: '100vh' }} />;
};

export default CubeGrid;

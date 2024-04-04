"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { matrix } from 'mathjs';
import { ellipticDistance, sigmoid } from '../libs/utils';

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
    
    const cubes: THREE.Mesh[] = [];
    const gridSize = 60;
    const spacing = 1.2;
    for (let x = 0; x < gridSize; x++) {
      for (let y = 0; y < gridSize; y++) {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
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

        const dist = Math.sqrt(cube.position.x ** 2 + cube.position.y ** 2);
        const distN = sigmoid(dist * 0.25 - 4);

        const colorGrad = (colors: string[], value: number) => {
          for (let i = 1; i < colors.length; i++) {
            if (value < i / (colors.length - 1)) {
              const colorGradient = new THREE.Color(colors[i-1]).lerp(new THREE.Color(colors[i]), value * (colors.length - 1) - (i - 1));
              return colorGradient.getHex();
            }
          }
        };

        const gray = "#606060";
        const white = "#ffffff";
        const yellow = "#FFCB6D";
        const pink = "#E434A5";
        const blue = "#348AEB";
        const darkGray = "#080808";
        const darkBlue = "#001122"
        const black = "#000000";

        const cubeColor = colorGrad([gray, darkGray], distN);
        if (cube.material instanceof THREE.MeshBasicMaterial && cubeColor !== undefined) {
          cube.material.color.set(cubeColor);
        }
        
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

/**
 * @file OzoneLayer.jsx
 * @description  * OzoneLayer component that renders a semi-transparent 3D sphere representing the Earth's ozone layer.
 * @returns {JSX.Element} A 3D sphere mesh with a translucent material simulating the ozone layer.
 * @date Created: 5/11/2024
 * @updated: 14/11/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */


import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Stars = () => {
  const starsRef = useRef();

  // Generar estrellas al inicio
  const generateStars = () => {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const starVertices = [];
    for (let i = 0; i < 5000; i++) {
      const x = (Math.random() - 0.5) * 100;
      const y = (Math.random() - 0.5) * 100;
      const z = (Math.random() - 0.5) * 100;
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    return new THREE.Points(starGeometry, starMaterial);
  };

  if (!starsRef.current) {
    starsRef.current = generateStars();
  }

  // Añadir rotación y parpadeo
  useFrame(() => {
    if (starsRef.current) {
      // Rotación lenta
      starsRef.current.rotation.y += 0.0005;

      // Parpadeo sutil
      const time = Date.now() * 0.001;
      starsRef.current.material.opacity = 0.7 + Math.sin(time * 0.5) * 0.3;
    }
  });

  return <primitive object={starsRef.current} />;
};

export default Stars;

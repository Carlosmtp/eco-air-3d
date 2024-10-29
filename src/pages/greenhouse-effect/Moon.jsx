/**
 * @file Moon.jsx
 * @description This component renders a 3D scene showcasing the Moon.
 * @date Created: 28/10/2024
 * @updated: 28/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Moon() {
  const moonRef = useRef();
  const { scene } = useGLTF('/models/greenhouse/moon.glb');

  // configuration to cast shadows
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = false;
      // Replace material if necessary
      child.material = new THREE.MeshStandardMaterial({
        map: child.material.map,
      });
      child.material.needsUpdate = true;
    }
  });

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const radius = 2;
    const speed = 0.1;
    if (moonRef.current) {
      moonRef.current.position.x = radius * Math.cos(t * speed);
      moonRef.current.position.z = radius * Math.sin(t * speed);
      moonRef.current.rotation.set(-Math.PI / 4, 0, 0); // initial rotation of the moon model
    }
  });

  return <primitive object={scene} ref={moonRef} scale={0.3} />;
}

export default Moon;

/**
 * @file Moon.jsx
 * @description This component renders a 3D scene showcasing the Earth.
 * @date Created: 28/10/2024
 * @updated: 28/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function EarthModel() {
  const earthRef = useRef();
  const { scene } = useGLTF('/models/greenhouse/earth.glb');

  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = false;
      child.material = new THREE.MeshStandardMaterial({
        map: child.material.map,
      });
      child.material.needsUpdate = true;
    }
  });

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return <primitive object={scene} ref={earthRef} scale={1} />;
}

export default EarthModel;

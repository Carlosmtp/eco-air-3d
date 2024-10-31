/**
 * @file Moon.jsx
 * @description EarthModel component to render a 3D model of Earth with rotation and shadow effects.
 * @returns {JSX.Element} The Earth 3D model primitive with shadows and rotation applied.
 * @date Created: 28/10/2024
 * @updated: 31/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import { useEffect, useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

/**
 * EarthModel component to render a 3D model of Earth with rotation and shadow effects.
 * @returns {JSX.Element} The Earth 3D model primitive with shadows and rotation applied.
 */
function EarthModel() {
  const earthRef = useRef();
  const { scene } = useGLTF('/models/greenhouse/earth.glb');

  useEffect(() => {
    // Enable shadows and set material for each mesh in the Earth model
    scene.traverse((child) => {
      if (child.isMesh) {
        child.receiveShadow = true; // Enable receiving shadows on Earth
        child.castShadow = true; // Enable casting shadows on Earth
        child.material = new THREE.MeshStandardMaterial({
          map: child.material.map,
        });
        child.material.needsUpdate = true;
      }
    });
  }, [scene]);

  useFrame(() => {
    // Rotate Earth slowly on its y-axis
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return <primitive object={scene} ref={earthRef} scale={1} />;
}

export default EarthModel;


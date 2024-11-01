/**
 * @file Moon.jsx
 * @description  * Moon component that renders a rotating 3D model of the Moon with shadow effects.
 * The Moon orbits in a circular path and casts/receives shadows in the scene.
 * @returns {JSX.Element} The 3D Moon model with rotation and orbital motion applied.
 * @date Created: 28/10/2024
 * @updated: 31/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

function Moon() {
  const moonRef = useRef();
  const { scene } = useGLTF('/models/greenhouse/moon.glb');

  // Configure shadows and apply standard material
  scene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      child.material = new THREE.MeshStandardMaterial({
        map: child.material.map,
      });
      child.material.needsUpdate = true;
    }
  });

  useFrame(({ clock }) => {
    // Update Moon's position to orbit in a circular path and apply initial rotation
    const t = clock.getElapsedTime();
    const radius = 1;
    const speed = 0.9;
    if (moonRef.current) {
      moonRef.current.position.x = radius * Math.cos(t * speed);
      moonRef.current.position.z = radius * Math.sin(t * speed);
      moonRef.current.rotation.set(-Math.PI / 4, 0, 0); // Initial rotation of the moon model
    }
  });

  return <primitive object={scene} ref={moonRef} scale={0.3} />;
}

export default Moon;
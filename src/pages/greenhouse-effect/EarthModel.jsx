/**
 * @file EarthModel.jsx
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
 * Includes dynamic heat spots that appear on specific impact locations.
 */
function EarthModel({ onImpact }) {
  const earthRef = useRef();
  const { scene } = useGLTF('/models/greenhouse/earth.glb');
  const heatSpotRef = useRef(); // Ref for the heat spot (small red area)

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

  useEffect(() => {
    // Function to handle impacts and create heat spots
    if (onImpact) {
      onImpact((worldPosition) => {
        if (heatSpotRef.current) {
          // Position the heat spot at the impact location
          heatSpotRef.current.position.copy(worldPosition);
          heatSpotRef.current.visible = true;

          // Hide the heat spot after 2 seconds
          setTimeout(() => {
            if (heatSpotRef.current) {
              heatSpotRef.current.visible = false;
            }
          }, 2000);
        }
      });
    }
  }, [onImpact]);

  useFrame(() => {
    // Rotate Earth slowly on its y-axis
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <>
      <primitive object={scene} ref={earthRef} scale={1} />
      {/* Heat spot sphere */}
      <mesh ref={heatSpotRef} visible={false}>
        <sphereGeometry args={[0.05, 32, 32]} /> {/* Small sphere */}
        <meshBasicMaterial color="red" transparent opacity={0.8} />
      </mesh>
    </>
  );
}

export default EarthModel;


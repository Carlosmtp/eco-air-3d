/**
 * @file Moon.jsx
 * @description  Cubemap component to set a 3D scene background using a cubemap texture.
 * @param {string[]} images - Array of URLs for the cubemap images (right, left, top, bottom, front, back).
 * @date Created: 30/10/2024
 * @updated: 31/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */


import { useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

function Cubemap({ images }) {
  const { scene } = useThree();

  useEffect(() => {
    const loader = new THREE.CubeTextureLoader();
    const texture = loader.load(images);
    scene.background = texture;

    return () => {
      // Limpiar el fondo cuando el componente se desmonte
      scene.background = null;
    };
  }, [images, scene]);

  return null;
}

export default Cubemap;
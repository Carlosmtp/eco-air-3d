/**
 * @file Moon.jsx
 * @description This component renders a 3D scene showcasing the OzoneLayer.
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

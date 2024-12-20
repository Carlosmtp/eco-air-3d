/**
 * @file PlayerModel.jsx
 * @description This component is the one that helps us with the loading of the model that we will use in the quiz scene.
 * @date Created: 03/12/2024
 * @updated: 11/12/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

function PlayerModel({ position, size }) {
  const { scene } = useGLTF('/models/quiz/space.glb');

  useEffect(() => {
    // Ajusta el tamaño
    scene.scale.set(0.3, 0.3, 0.3);
    // Ajusta la posición inicial
    scene.position.set(...position);
  }, [position, size, scene]);

  return <primitive object={scene} />;
}

export default PlayerModel;

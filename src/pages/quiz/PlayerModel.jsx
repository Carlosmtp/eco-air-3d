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

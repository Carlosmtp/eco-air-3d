/**
 * @file SunRay.jsx
 * @description Representa un rayo de luz que llega a la Tierra, algunos reflejados y otros atrapados por la capa de ozono.
 * @returns {JSX.Element} La flecha que representa un rayo de sol.
 * @date Created: 08/11/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import { useEffect, useRef } from 'react';
import { useThree } from '@react-three/fiber';
import { Vector3, ArrowHelper } from 'three';

const SunRay = ({ position, direction, color = 0xffff00, bounce = false }) => {
  const rayRef = useRef();
  const { scene } = useThree();

  useEffect(() => {
    // Crear la flecha (ArrowHelper)
    const arrow = new ArrowHelper(
      new Vector3(0, 0, -1), // Dirección inicial
      new Vector3(...position), // Posición inicial
      1, // Longitud de la flecha
      color // Color de la flecha
    );

    // Añadir la flecha a la escena
    scene.add(arrow);

    // Asignar la referencia para animación
    rayRef.current = arrow;

    // Limpiar la flecha al desmontar el componente
    return () => {
      scene.remove(arrow);
    };
  }, [scene, position, color]);

  useEffect(() => {
    if (rayRef.current) {
      // Actualizar la dirección si se proporciona una dirección
      rayRef.current.setDirection(direction);
    }
  }, [direction]);

  return null;
};

export default SunRay;
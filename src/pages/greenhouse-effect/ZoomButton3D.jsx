/**
 * @file InfoButton.jsx
 * @description InfoButton component that renders a button to toggle the visibility of an information modal.
 * @param {Function} toggleModal - Function to toggle the visibility of the info modal.
 * @returns {JSX.Element} A button labeled "Más Información" to open or close the modal.
  @date Created: 1/11/2024
 * @updated: 14/11/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import { useRef, useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

function ZoomButton3D({ zoomedIn, toggleZoom, buttonPosition }) {
  const buttonRef = useRef();
  const [buttonSize, setButtonSize] = useState([0.5, 0.2]);

  // Cambiar el tamaño del botón según el estado de `zoomedIn`
  useEffect(() => {
    if (zoomedIn) {
      setButtonSize([0.5, 0.2]);// Tamaño original al alejar

    } else {
      setButtonSize([1, 0.2]);// Tamaño grande al acercar
    }
  }, [zoomedIn]);

  // Función para alternar entre "Acercar" y "Alejar"
  const handleClick = () => {
    toggleZoom();
  };

  return (
    <mesh
      ref={buttonRef}
      position={buttonPosition}
      onClick={handleClick}
      castShadow
      receiveShadow
    >
      <planeGeometry args={buttonSize} />
      <meshStandardMaterial
        color={zoomedIn ? '#00FF00' : '#FF0000'}
        emissive={zoomedIn ? '#00FF00' : '#FF0000'}
        emissiveIntensity={0.3}
        roughness={0.3}
        metalness={0.6}
        side={THREE.FrontSide}
      />
      <Html center>
        <div style={{
          color: 'white',
          fontSize: '20px',
          fontWeight: 'bold',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif'
        }}>
          {zoomedIn ? 'Alejar' : 'Acercar'}
        </div>
      </Html>
    </mesh>
  );
}

export default ZoomButton3D;

/**
 * @file ZoomButton3D.jsx
 * ZoomButton component that renders a button to toggle zoom in/out on a 3D scene.
 * @param {boolean} zoomedIn - Boolean indicating the current zoom state; true if zoomed in.
 * @param {Function} toggleZoom - Function to toggle the zoom state.
 * @returns {JSX.Element} A button labeled "Acercar" or "Alejar" based on zoom state.
 * @returns {JSX.Element} A fully interactive 3D greenhouse simulation.
* @date Created: 31/10/2024
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
        <div
          onClick={handleClick}
          style={{
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

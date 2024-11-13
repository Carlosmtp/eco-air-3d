/**
 * @file GreenHouse.jsx
 * ZoomButton component that renders a button to toggle zoom in/out on a 3D scene.
 * @param {boolean} zoomedIn - Boolean indicating the current zoom state; true if zoomed in.
 * @param {Function} toggleZoom - Function to toggle the zoom state.
 * @returns {JSX.Element} A button labeled "Acercar" or "Alejar" based on zoom state.
 * @returns {JSX.Element} A fully interactive 3D greenhouse simulation.
* @date Created: 31/10/2024
 * @updated: 12/11/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import { useRef } from 'react';
import { MeshStandardMaterial, Mesh, PlaneGeometry } from 'three';
import { Html } from '@react-three/drei';
import * as THREE from 'three'; // Importar THREE

function ZoomButton3D({ zoomedIn, toggleZoom }) {
  const buttonRef = useRef();

  const handleClick = () => {
    toggleZoom();
  };

  return (
    <>
      <mesh
        ref={buttonRef}
        position={[-2, 1, -4]} // Ajustada a la izquierda, más cerca de la cámara
        onClick={handleClick}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[2, 1]} />
        <meshStandardMaterial
          color={zoomedIn ? '#00FF00' : '#FF0000'}
          emissive={zoomedIn ? '#00FF00' : '#FF0000'}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.6}
          side={THREE.FrontSide} // Usamos THREE.FrontSide
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
    </>
  );
}

export default ZoomButton3D;


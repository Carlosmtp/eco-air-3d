/**
 * @file InfoButton.jsx
 * @description InfoButton component that renders a button to toggle the visibility of an information modal.
 * @param {Function} toggleModal - Function to toggle the visibility of the info modal.
 * @returns {JSX.Element} A button labeled "Más Información" to open or close the modal.
  @date Created: 31/10/2024
 * @updated: 12/11/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */
  import { useRef, useState } from 'react';
  import { useGLTF } from '@react-three/drei';
  import { Html } from '@react-three/drei';
  import * as THREE from 'three';

  function InfoButton3D({ modelUrl, onClick, description }) {
    const { scene } = useGLTF(modelUrl);  // Cargar el modelo GLTF
    const buttonRef = useRef();
    const [hovered, setHovered] = useState(false);

    const handlePointerOver = () => setHovered(true);
    const handlePointerOut = () => setHovered(false);

    const handleClick = () => {
      if (onClick) onClick(); // Ejecuta la función al hacer clic
    };

    return (
      <>
        <mesh
          ref={buttonRef}
          position={[0, 1, -5]} // Ubicación del modelo 3D
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          castShadow
          receiveShadow
        >
          {/* Usamos el modelo GLTF cargado */}
          <primitive object={scene} scale={[0.5, 0.5, 0.5]} />
        </mesh>

        {/* Texto debajo del modelo GLTF */}
        <Html position={[0, 0.5, -5]} center>
          <div style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
          }}>
            {description}
          </div>
        </Html>
      </>
    );
  }

  export default InfoButton3D;


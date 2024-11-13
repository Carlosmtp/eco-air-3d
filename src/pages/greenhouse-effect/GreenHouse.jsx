/**
 * @file GreenHouse.jsx
 * GreenHouse component renders an interactive 3D scene that simulates the Greenhouse Effect.
 * It includes Earth, an ozone layer, the Moon, and a cubemap background, with controls for zooming and info modal.
 * @returns {JSX.Element} A fully interactive 3D greenhouse simulation.
 * @date Created: 27/10/2024
 * @updated: 12/11/2024 - Added functionality to move the entire scene with a zoom button
 * @autor Andres Mauricio Ortiz
 */

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import UserInfo from "../world/UserInfo";
import EarthModel from './EarthModel';
import OzoneLayer from './OzoneLayer';
import Moon from './Moon';
import './GreenHouse.css';
import Cubemap from './Cubemap';
import ZoomButton3D from './ZoomButton3D'; // Asegúrate de que el archivo esté en el lugar correcto
import InfoButton3D from './InfoButton3D'; // Asegúrate de que el archivo esté en el lugar correcto

const GreenHouse = () => {
  const [zoomedIn, setZoomedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cameraRef = useRef();
  const groupRef = useRef();
  const [groupPosition, setGroupPosition] = useState([0, 0, 0]); // Posición inicial del grupo

  // Alternar el estado de zoom
  const toggleZoom = () => {
    setZoomedIn((prev) => !prev);
  };

  // Ajustar la posición y escala de la escena al hacer zoom
  useEffect(() => {
    if (cameraRef.current && groupRef.current) {
      groupRef.current.position.set(
        zoomedIn ? -0.70 : 0,
        zoomedIn ? -0.30 : 0,
        zoomedIn ? 0 : 0
      );
      groupRef.current.scale.set(zoomedIn ? 1.5 : 1, zoomedIn ? 1.5 : 1, zoomedIn ? 1.5 : 1);

      cameraRef.current.fov = zoomedIn ? 30 : 45;
      cameraRef.current.updateProjectionMatrix();
    }
  }, [zoomedIn]);

  // Detectar eventos de teclado (flechas)
  const handleKeyDown = (event) => {
    let [x, y, z] = groupPosition;

    if (event.key === 'ArrowUp') {
      z -= 0.1; // Mover hacia adelante
    }
    if (event.key === 'ArrowDown') {
      z += 0.1; // Mover hacia atrás
    }
    if (event.key === 'ArrowLeft') {
      x -= 0.1; // Mover hacia la izquierda
    }
    if (event.key === 'ArrowRight') {
      x += 0.1; // Mover hacia la derecha
    }

    setGroupPosition([x, y, z]);
  };

  // Añadir y limpiar el listener para las teclas
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [groupPosition]);

  const cubemapImages = [
    '/cubemapSpace/right.png',
    '/cubemapSpace/left.png',
    '/cubemapSpace/top.png',
    '/cubemapSpace/bottom.png',
    '/cubemapSpace/front.png',
    '/cubemapSpace/back.png',
  ];

  return (
    <div className="greenhouse-container">
      <UserInfo />
      <Canvas
        shadows
        camera={{ position: [0, 1, 2], fov: 45 }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <Suspense fallback={null}>
          <group ref={groupRef} position={groupPosition}>
            <Cubemap images={cubemapImages} />
            <ambientLight intensity={0.1} />
            <directionalLight
              position={[5, 0, 5]}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <pointLight position={[-10, 10, -10]} intensity={0.5} />
            <EarthModel />
            <OzoneLayer />
            <Moon />
          </group>
        </Suspense>

        <OrbitControls />

        {/* Botones 3D de Zoom e Información */}
        <ZoomButton3D zoomedIn={zoomedIn} toggleZoom={toggleZoom} />

        {/* InfoButton3D con el modelo GLTF */}
        <InfoButton3D
          modelUrl="/models/greenhouse/infoModel.glb" // Ruta del modelo GLTF
          onClick={() => setShowModal(true)}
          description="Más Información"
        />
      </Canvas>

      {/* Modal de Información */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Comprendiendo el Efecto Invernadero</h2>
            <p>
              El efecto invernadero es fundamental para mantener la temperatura de nuestro planeta.
              Sin embargo, las actividades humanas han intensificado este proceso, atrapando más calor en la atmósfera y contribuyendo al cambio climático.
            </p>
            <button className="close-button" onClick={() => setShowModal(false)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenHouse;

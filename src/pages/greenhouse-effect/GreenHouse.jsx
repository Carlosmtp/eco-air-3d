/**
 * @file GreenHouse.jsx
 * GreenHouse component renders an interactive 3D scene that simulates the Greenhouse Effect.
 * It includes Earth, an ozone layer, the Moon, and a cubemap background, with controls for zooming and info modal.
 * @returns {JSX.Element} A fully interactive 3D greenhouse simulation.
 * @date Created: 27/10/2024
 * @updated: 08/11/2024 - Added functionality to move the entire scene with a zoom button
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
import ZoomButton from './ZoomButton';
import InfoButton from './InfoButton';

const GreenHouse = () => {
  const [zoomedIn, setZoomedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cameraRef = useRef(); // Referencia para la cámara
  const groupRef = useRef(); // Referencia para toda la escena

  /**
   * Alternar el estado de zoom para la escena completa.
   */
  const toggleZoom = () => {
    setZoomedIn((prev) => !prev);
  };

  /**
   * Ajustar la posición y la escala de toda la escena al hacer zoom.
   */
  useEffect(() => {
    if (cameraRef.current && groupRef.current) {
      // Ajustar la posición del grupo completo (escena)
      groupRef.current.position.set(
        zoomedIn ? -0.70 : 0,
        zoomedIn ? -0.30 : 0,
        zoomedIn ? 0 : 0
      );
      groupRef.current.scale.set(zoomedIn ? 1.5 : 1, zoomedIn ? 1.5 : 1, zoomedIn ? 1.5 : 1);

      // Ajustar el campo de visión (fov) de la cámara para acercar o alejar
      cameraRef.current.fov = zoomedIn ? 30 : 45; // Cambia el valor según tu preferencia
      cameraRef.current.updateProjectionMatrix(); // Importante para que el cambio tenga efecto
    }
  }, [zoomedIn]);

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
        // onPointerMove={(event) => {
        //   if (groupRef.current) {
        //     groupRef.current.position.x += event.movementX * 0.01;
        //     groupRef.current.position.y -= event.movementY * 0.01;
        //     console.log(`Posición del grupo: [${groupRef.current.position.x.toFixed(2)}, ${groupRef.current.position.y.toFixed(2)}, ${groupRef.current.position.z.toFixed(2)}]`);
        //   }
        // }}
      >
        <Suspense fallback={null}>
          <group ref={groupRef}>
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

            {/* Modelos dentro del grupo */}
            <EarthModel />
            <OzoneLayer />
            <Moon />
          </group>
        </Suspense>

        <OrbitControls/>

      </Canvas>

      {/* Botones de Zoom e Información */}
      <ZoomButton zoomedIn={zoomedIn} toggleZoom={toggleZoom} />
      <InfoButton toggleModal={() => setShowModal(!showModal)} />

      {/* Modal de Información */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Comprendiendo el Efecto Invernadero</h2>
            <p>
              El efecto invernadero es fundamental para mantener la temperatura de nuestro planeta.
              Sin embargo, las actividades humanas han intensificado este proceso, atrapando más calor en la
              atmósfera y contribuyendo al cambio climático.
            </p>
            <button className="close-button" onClick={() => setShowModal(false)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenHouse;

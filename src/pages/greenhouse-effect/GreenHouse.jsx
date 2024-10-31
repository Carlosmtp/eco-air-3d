/**
 * @file GreenHouse.jsx
* GreenHouse component renders an interactive 3D scene that simulates the Greenhouse Effect.
* It includes Earth, an ozone layer, the Moon, and a cubemap background, with controls for zooming and info modal.
* @returns {JSX.Element} A fully interactive 3D greenhouse simulation.
* @date Created: 27/10/2024
 * @updated: 31/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
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
  const [zoomedIn, setZoomedIn] = useState(false); // State to manage zoom level
  const [showModal, setShowModal] = useState(false); // State to control info modal visibility
  const cameraRef = useRef(); // Reference to camera object for zoom manipulation

  /**
   * Toggles zoom state between zoomed-in and zoomed-out positions.
   */
  const toggleZoom = () => {
    setZoomedIn((prev) => !prev);
  };

  /**
   * Toggles the modal's visibility for displaying additional information.
   */
  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 1, zoomedIn ? 4 : 2); // Adjusts camera position based on zoom state
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
      >
        <Suspense fallback={null}>
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
        </Suspense>
        <OrbitControls />
      </Canvas>

      {/* Zoom and Info buttons */}
      <ZoomButton zoomedIn={zoomedIn} toggleZoom={toggleZoom} />
      <InfoButton toggleModal={toggleModal} />

      {/* Info modal */}
      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Comprendiendo el Efecto Invernadero</h2>
            <p>
              El efecto invernadero es fundamental para mantener la temperatura de nuestro planeta.
              Sin embargo, las actividades humanas han intensificado este proceso, atrapando más calor en la
              atmósfera y contribuyendo al cambio climático. Este fenómeno provoca un aumento de las temperaturas,
              alteraciones en los ecosistemas y fenómenos meteorológicos extremos, afectando a todas las
              formas de vida en la Tierra.
            </p>
            <button className="close-button" onClick={toggleModal}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenHouse;

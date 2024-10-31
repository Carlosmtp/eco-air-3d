/**
 * @file GreenHouse.jsx
 * @description This component renders a 3D interactive scene simulating
 * the Greenhouse Effect, including Earth, an Ozone layer, and the Moon.
 * The component provides controls for user interaction and visualizes
 * environmental elements with realistic lighting and shadows.
 * @date Created: 27/10/2024
 * @updated: 31/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import UserInfo from "../world/UserInfo";
import EarthModel from './EarthModel';
import OzoneLayer from './OzoneLayer';
import Moon from './Moon';
import './GreenHouse.css';
import Cubemap from './Cubemap';


const GreenHouse = () => {

  const [zoomedIn, setZoomedIn] = useState(false); // Estado para manejar el zoom
  const cameraRef = useRef(); // Referencia a la cámara

  const toggleZoom = () => {
    setZoomedIn((prev) => !prev);
  };

  useEffect(() => {
    if (cameraRef.current) {
      if (zoomedIn) {
        cameraRef.current.position.set(0, 1, 4); //acercar
      } else {
        cameraRef.current.position.set(0, 1, 2); // alejar
      }
    }
  }, [zoomedIn]);

  const cubemapImages = [
    '/cubemapSpace/right.png',  // posx
    '/cubemapSpace/left.png',   // negx
    '/cubemapSpace/top.png',    // posy
    '/cubemapSpace/bottom.png', // negy
    '/cubemapSpace/front.png',  // posz
    '/cubemapSpace/back.png',   // negz
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
          {/* Optional: <Environment files="/textures/space.hdr" background /> */}

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

      {/* Botón de acercar/alejar */}
      <button
        onClick={toggleZoom}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {zoomedIn ? 'Alejar' : 'Acercar'}
      </button>

    </div>
  );
};

export default GreenHouse;

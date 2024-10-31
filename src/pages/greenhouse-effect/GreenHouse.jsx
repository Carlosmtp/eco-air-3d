/**
 * @file GreenHouse.jsx
 * @description This component renders a 3D interactive scene simulating
 * the Greenhouse Effect, including Earth, an Ozone layer, and the Moon.
 * The component provides controls for user interaction and visualizes
 * environmental elements with realistic lighting and shadows.
 * @date Created: 27/10/2024
 * @updated: 28/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import UserInfo from "../world/UserInfo";
import EarthModel from './EarthModel';
import OzoneLayer from './OzoneLayer';
import Moon from './Moon';
import './GreenHouse.css';


const GreenHouse = () => {
  return (
    <div className="greenhouse-container">
      <UserInfo />
      <Canvas shadows camera={{ position: [0, 3, 6], fov: 60 }}>
        <Suspense fallback={null}>
          {/* Optional: <Environment files="/textures/space.hdr" background /> */}
          <ambientLight intensity={0.1} />
          <directionalLight
            castShadow
            position={[5, 10, 5]}
            intensity={1.5}
            shadow-mapSize={{ width: 2048, height: 2048 }}
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
    </div>
  );
};

export default GreenHouse;

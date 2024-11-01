/* eslint-disable react/no-unknown-property */
/**
 * @file OzoneLayer.jsx
 * @description This component renders a 3D scene of the Ozone Layer, including a representation of the Earth, ambient light, directional light, visual indicators for UV radiation, and an introductory card with information about the Ozone Layer.
 * @date Created: 31/10/2024
 * @date Last Modified: 31/10/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 */

import { Canvas } from "@react-three/fiber";
import { Line, Text, useTexture } from "@react-three/drei";
import UserInfo from "../world/UserInfo";
import Earth from "../login/Earth";
import IntroCard from "./IntroCard"; 
import "./OzoneLayer.css";
import { useMemo } from "react";
import * as THREE from 'three'; // Ensure THREE is imported

const Scene = () => {
  const MATERIAL_PATH = useMemo(() => "materials/ozone-layer/fabric_pattern_05_", []);

  const [colorMap, normalMap, roughnessMap, aoMap] = useTexture([
    `${MATERIAL_PATH}col_01_1k.jpg`, 
    `${MATERIAL_PATH}nor_gl_1k.jpg`,  
    `${MATERIAL_PATH}rough_1k.jpg`,    
    `${MATERIAL_PATH}ao_1k.jpg`,       
  ]);

  // Set the repeat and wrap for the textures
  const repeatCount = 15; // Adjust this value as needed
  colorMap.wrapS = normalMap.wrapS = roughnessMap.wrapS = aoMap.wrapS = THREE.RepeatWrapping;
  colorMap.wrapT = normalMap.wrapT = roughnessMap.wrapT = aoMap.wrapT = THREE.RepeatWrapping;

  colorMap.repeat.set(repeatCount, repeatCount);
  normalMap.repeat.set(repeatCount, repeatCount);
  roughnessMap.repeat.set(repeatCount, repeatCount);
  aoMap.repeat.set(repeatCount, repeatCount);

  return (
    <>
      <ambientLight />
      <directionalLight position={[5, 5, 5]} intensity={5} />
      {/* Lines representing sunlight */}
      <Line points={[[5, 5, 5], [3, 0, 0]]} color="yellow" lineWidth={2} />
      <Line points={[[5, 5, 5], [0, 3, 0]]} color="yellow" lineWidth={2} />
      <Line points={[[5, 5, 5], [0, 0, 3]]} color="yellow" lineWidth={2} />
      {/* Indicative texts */}
      <Text position={[4, 3, 0]} fontSize={0.5} color="blue">UVB</Text>
      <Text position={[4.5, 0.5, 0]} fontSize={0.5} color="blue">UVC</Text>
      <Text position={[1.8, 3.7, 0]} fontSize={0.5} color="blue">UVA</Text>
      {/* Sphere representing the ozone layer */}
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial
          map={colorMap}          
          normalMap={normalMap}  
          roughnessMap={roughnessMap}
          aoMap={aoMap}          
          transparent
          opacity={0.5}
        />
      </mesh>
      {/* Earth */}
      <Earth position={[0, 0, 0]} scale={[2, 2, 2]} />
    </>
  );
};

const OzoneLayer = () => {
  return (
    <div className="ozone-layer-container">
      <UserInfo />
      <div className="ozone-canvas">
        <Canvas>
          <Scene />
        </Canvas>
      </div>
      <IntroCard />
    </div>
  );
};

export default OzoneLayer;

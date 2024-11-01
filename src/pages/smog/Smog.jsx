/**
 * @file Smog.jsx
 * @description This component renders a 3D canvas for the Smog scene with basic interaction.
 * @date Created: 31/10/2024
 * @authors
 * Jhoimar Silva Torres - jhoimar.silva@correounivalle.edu.co
 */

import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei"; 
import UserInfo from "../world/UserInfo";
import LittleCity from "./LittleCity"; 
import "./Smog.css";

const Smog = () => {
  return (
    <div className="smog-container">
      <UserInfo />
      <div className="city-container">
        <Canvas>
          <directionalLight position={[5, 5, 5]} intensity={5} castShadow={false} />
          <LittleCity position={[-3, 0, 0]} scale={[1.5, 1.5, 1.5]} />
           <OrbitControls enableRotate={true} enableZoom={true} enablePan={false} />
        </Canvas>

        <div className="info-container">
          <h3>Smog</h3>
          <p>
            El <strong>smog</strong> es una forma de contaminación del aire que se produce cuando el humo
            y la neblina se combinan en las áreas urbanas. 
          </p>
          <p>
            Entre las principales causas del smog se encuentran las emisiones de gases de escape de automóviles
            y camiones, así como las emisiones de las fábricas que utilizan combustibles fósiles. Además, las 
            condiciones climáticas, como las altas temperaturas y la falta de viento, pueden atrapar los
            contaminantes cerca del suelo, exacerbando el problema.
          </p>
          <p>
            La presencia de smog no solo afecta la visibilidad, sino que también tiene un impacto significativo
            en la salud pública, contribuyendo a problemas respiratorios y cardiovasculares.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Smog;
  

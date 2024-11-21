/* eslint-disable react/no-unknown-property */
/**
 * @file Smog.jsx
 * @description This component renders a 3D scene of the smog.
 * @date Created: 31/10/2024
 * @date Last Modified: 15/11/2024
 * @author Jhoimar Silva <Torres></Torres>
 *         jhoimar.silva@correounivalle.edu.co
 */

import React, { useState, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, Html, Stars, Sky, Cloud } from "@react-three/drei";  
import * as THREE from 'three'; 
import LittleCity from "./LittleCity"; 
import UserInfo from "../world/UserInfo";
import "./Smog.css";

const CameraController = () => {
  const { camera } = useThree();
  const moveSpeed = 0.1;

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowUp':
          camera.position.z -= moveSpeed;
          break;
        case 'ArrowDown':
          camera.position.z += moveSpeed;
          break;
        case 'ArrowLeft':
          camera.position.x -= moveSpeed;
          break;
        case 'ArrowRight':
          camera.position.x += moveSpeed;
          break;
        default:
          break;
      }
      camera.updateProjectionMatrix();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [camera]);

  return null;
};

const Smog = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [opacity, setOpacity] = useState(0.9);

  const pages = [
    {
      title: "¿Qué es el Smog?",
      content: (
        <p>
          El <strong>smog</strong> es una forma de contaminación del aire que se produce cuando el humo
          y la neblina se combinan en las áreas urbanas.
        </p>
      ),
    },
    {
      title: "Principales Causas del Smog",
      content: (
        <p>
          Entre las principales causas del smog se encuentran las emisiones de gases de escape de automóviles
          y camiones, así como las emisiones de las fábricas que utilizan combustibles fósiles.
        </p>
      ),
    },
    {
      title: "Efectos del Smog en el Clima",
      content: (
        <p>
          Las condiciones climáticas, como las altas temperaturas y la falta de viento, pueden atrapar los
          contaminantes cerca del suelo, exacerbando el problema.
        </p>
      ),
    },
    {
      title: "Impacto en la Salud",
      content: (
        <p>
          La presencia de smog no solo afecta la visibilidad, sino que también tiene un impacto significativo
          en la salud pública, contribuyendo a problemas respiratorios y cardiovasculares.
        </p>
      ),
    },
  ];

  // Manejador del botón "Siguiente"
  const handleNext = () => {
    setPageIndex((prevIndex) => (prevIndex + 1) % pages.length);
  };

  // Actualizar posición del mouse y opacidad
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      setOpacity(Math.max(0.3, 1 - distance / 1.5)); 
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="smog-container">
      <UserInfo />
      
      {/* Contenedor de la escena 3D */}
      <div className="city-container">
        
        <Canvas>
          <FogScene />

          {/* Luz direccional */}
          <directionalLight position={[5, 5, 5]} intensity={3} castShadow={true} />
          
          {/* Efectos de ambiente */}
          <Sky 
            distance={450000} 
            sunPosition={[0, 0, 0]} 
            inclination={0.5} 
            azimuth={0.25} 
          />
          <Stars />
          
          {/* Nubes */}
          <Cloud
            seed={5}
            scale={0.5}
            position={[-2, 0, 1]} 
            volume={4}
            fade={10}
            speed={0.4}
            rotationSpeed={0.4}
            growth={0.8}
            castShadow
            receiveShadow
            material={new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.8, metalness: 0.1 })} 
          />
          
          {/* Escena de la ciudad */}
          <LittleCity position={[-2, 0, 0]} scale={[1.8, 1.8, 1.8]} />
          <ambientLight intensity={opacity} />
          
          {/* Controles de cámara */}
          <OrbitControls
            enableRotate={true}
            enableZoom={true}
            enablePan={false}
            minPolarAngle={Math.PI / 9}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 5}
            maxAzimuthAngle={Math.PI / 8}
            minDistance={3}
            maxDistance={4.5}
          />

          <CameraController />

          {/* Elementos HTML 3D */}
          <Html 
            position={[-6, -2, 0]} 
            style={{ textAlign: "left", whiteSpace: 'nowrap',color: 'white' }}
          >
            <h1>Bienvenido a la Escena de Smog</h1>
          </Html>
        </Canvas>
      </div>

      {/* Información sobre el smog */}
      <div className="info-container">
        <h3>{pages[pageIndex].title}</h3>
        {pages[pageIndex].content}
        <button onClick={handleNext} className="next-button">Siguiente</button>
      </div>
    </div>
  );
};

// Componente para añadir la niebla
const FogScene = () => {
  const { scene } = useThree(); 

  useEffect(() => {
    scene.fog = new THREE.Fog('#369dbf', 15, 15); 

    return () => {
    
      scene.fog = null;
    };
  }, [scene]);

  return null; 
};

export default Smog;

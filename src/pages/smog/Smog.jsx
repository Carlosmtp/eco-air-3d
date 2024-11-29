/* eslint-disable react/no-unknown-property */
/**
 * @file Smog.jsx
 * @description This component renders a 3D scene of the smog.
 * @date Created: 31/10/2024
 * @date Last Modified: 28/11/2024
 * @author Jhoimar Silva 
 *         jhoimar.silva@correounivalle.edu.co
 */

import React, { useState, useEffect, useRef } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Stars, Sky, Cloud, Text } from "@react-three/drei";  
import * as THREE from 'three'; 
import { Physics, useSphere } from "@react-three/cannon";
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

// Nubes Animadas con Movimiento del Mouse
const AnimatedCloud = (props) => {
  const cloudRef = useRef();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      setMousePosition({ x });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    const { x } = mousePosition;
    cloudRef.current.position.x = props.position[0] + x * 0.2; 
  });

  return <Cloud ref={cloudRef} {...props} />;
};

// Partícula de Smog con Física
const SmogParticle = ({ position }) => {
  const [ref, api] = useSphere(() => ({
    mass: 0.5,
    position: position,
    args: [0.05],
    type: 'Dynamic',
    material: {
      friction: 0.1,
      restitution: 0.5
    }
  }));

  useFrame(() => {
    // Aplicar movimiento suave ascendente y deriva horizontal
    api.velocity.set(
      Math.sin(Date.now() * 0.001) * 0.5, 
      0.5, 
      Math.cos(Date.now() * 0.001) * 0.5
    );
  });

  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial 
        color="#888888" 
        transparent 
        opacity={0.5} 
        roughness={0.1} 
      />
    </mesh>
  );
};

const Smog = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [opacity, setOpacity] = useState(0.9);
  const [smogParticles, setSmogParticles] = useState([]);

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
    const cloudBasePosition = [-3, -2, -1]; 
    setPageIndex((prevIndex) => (prevIndex + 1) % pages.length);
    
    // Generar nuevas partículas de smog
    const newParticles = Array.from({ length: 50 }, (_, index) => ({
      id: Date.now() + index,
      position: [
        cloudBasePosition[0] + (Math.random() - 0.5) * 2, 
        cloudBasePosition[1] + Math.random() * 2,         
        cloudBasePosition[2] + (Math.random() - 0.5) * 2  
      ]
    }));
    
    setSmogParticles(prev => [...prev, ...newParticles]);
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
          <Physics gravity={[0, -0.5, 0]}>
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
            
            {/* Texto 3D añadido */}
            <Text position={[-5, 3, -4]}  fontSize={0.6} color="red" anchorX="center" anchorY="middle">
              ¡CUIDEMOS NUESTRO AIRE!
            </Text>
            <Text position={[-5, 2, -4]} fontSize={0.4} color="white" anchorX="center" anchorY="middle">
              El smog daña la salud y el medio ambiente.
            </Text>
            
            {/* Nubes */}
            <AnimatedCloud
              seed={10}
              scale={0.5}
              position={[-3.5, -1, -1]} 
              volume={5}
              fade={10}
              speed={0.4}
              rotationSpeed={0}
              growth={0.8}
              castShadow
              receiveShadow
              material={new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.8, metalness: 0.1 })} 
            />
            
            {/* Partículas de Smog */}
            {smogParticles.map((particle) => (
              <SmogParticle 
                key={particle.id} 
                position={particle.position} 
              />
            ))}
            
            {/* Escena de la ciudad */}
            <LittleCity position={[-3, -1, -1]} scale={[1.8, 1.8, 1.8]} />
            <ambientLight intensity={opacity} />
            
            {/* Controles de cámara */}
            <OrbitControls
              enableRotate={true}
              enableZoom={true}
              enablePan={false}
              minPolarAngle={Math.PI / 9}
              maxPolarAngle={Math.PI / 2}
              minAzimuthAngle={-Math.PI / 18}
              maxAzimuthAngle={Math.PI / 9}
              minDistance={4}
              maxDistance={8}
            />

            <CameraController />
          </Physics>
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
    scene.fog = new THREE.FogExp2(0x555555, 0.02);

    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return null;
};

export default Smog;
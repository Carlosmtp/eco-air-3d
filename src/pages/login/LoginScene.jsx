/* eslint-disable react/no-unknown-property */
/** 
 * @file LoginScene.jsx
 * @description This file defines the login 3D scene of the application with cubemap sky environment and camera movement based on mouse input.
 * @date Created: 24/10/2024
 * @date Last Modified: 24/10/2024
 */

import { MapControls, Environment } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useRef, useEffect } from "react";
import Sphere from "./Sphere";
import "./Login.css";

// Componente para manejar el movimiento de la cámara con el mouse
const CameraController = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  const onMouseMove = (event) => {
    const { innerWidth, innerHeight } = window;
    mouse.current.x = (event.clientX / innerWidth) * 2 - 1; // Valor entre -1 y 1
    mouse.current.y = -(event.clientY / innerHeight) * 2 + 1; // Valor entre -1 y 1
  };

  useFrame(() => {
    // Ajusta la rotación de la cámara según la posición del mouse
    camera.rotation.y = mouse.current.x * 0.1; // Ajusta la sensibilidad
    camera.rotation.x = mouse.current.y * 0.1;
  });

  // Escuchar eventos del mouse
  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return null;
};

const LoginScene = () => {
  return (
    <div className="login-scene">
      <React.Fragment>
        <Canvas>
          {/* Componente para controlar la cámara con el mouse */}
          <CameraController />

          <MapControls enablePan={false} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 100, 0]} intensity={7} />

          {/* Cargar el Environment usando el cubemap */}
          <Environment
            files={[
              "/cubemap/px.png",
              "/cubemap/nx.png",
              "/cubemap/py.png",
              "/cubemap/ny.png",
              "/cubemap/pz.png",
              "/cubemap/nz.png"
            ]}
            background
          />

          <Sphere />
        </Canvas>
      </React.Fragment>
    </div>
  );
};

export default LoginScene;

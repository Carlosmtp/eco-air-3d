/**
 * @file World.js
 * @description This component renders a 3D world with a sphere, lights, and orbit controls using react-three-fiber.
 *              It also provides an user info component displaying the user's information (photo and name) and an exit button to sign out.
 * @date Created: 03/09/2024
 * @date Last Modified: 05/09/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 * @author Jhoimar Enrique Silva Torres
 *         jhoimar.silva@correounivalle.edu.co
 */

/* eslint-disable react/no-unknown-property */

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import "./World.css";
import UserInfo from "./UserInfo";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { Text } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store"; // Estado de autenticación con Zustand

// RotatingCube - Componente de un cubo giratorio como marcador de posición para futuros modelos 3D.
const RotatingCube = () => {
  const cubeRef = useRef();

  // Rotación del cubo en cada renderizado de frame
  useFrame(() => {
    cubeRef.current.rotation.x += 0.01;
    cubeRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={cubeRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

// Title3D - Componente que renderiza el título en 3D y lo mueve según el mouse.
const Title3D = () => {
  const font = new FontLoader().load("/path/to/font.json"); // Reemplaza con la ruta de tu fuente
  const titleRef = useRef();

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Actualización de la posición del mouse
  useEffect(() => {
    const handleMouseMove = (event) => {
      setMouse({
        x: (event.clientX / window.innerWidth) * 2 - 1,
        y: -(event.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Actualizar la posición del título en función de la posición del mouse
  useFrame(() => {
    if (titleRef.current) {
      titleRef.current.position.x = mouse.x * 1.5; // Ajusta el multiplicador para sensibilidad
      titleRef.current.position.y = mouse.y * 1.5; // Ajusta el multiplicador para sensibilidad
    }
  });

  return (
    <Text
      ref={titleRef}
      font={font}
      scale={[3, 3, 3]} // Ajuste de escala para texto más pequeño
      position={[8, 1.5, -4]} // Posición en la escena, ajustada más cerca de la cámara
      color="#000000" // Color del texto
    >
      Problemas medioambientales del aire
    </Text>
  );
};

// World - Componente principal que renderiza el título y marcadores de posición en 3D.
const World = () => {
  const { user, setUser, loading, observeAuthState } = useAuthStore(); // Estado del usuario actual y carga
  const navigate = useNavigate();

  if (!user) {
    navigate("/");
  }

  return (
    <div className="world-container">
      <UserInfo />

      {/* Título en 3D */}
      <Canvas style={{ height: "200px", width: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <OrbitControls enablePan={false} enableZoom={false} />
        <Title3D />
      </Canvas>

      {/* Marcadores de posición en 3D para cada problema ambiental */}
      <div className="canvas-row">
        {/* Canvas de la Capa de Ozono */}
        <div className="canvas-container" onClick={() => navigate("/ozone-layer")}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 5]} intensity={1} />
            <OrbitControls enablePan={false} enableZoom={false} />
            <RotatingCube />
          </Canvas>
          <h2 className="canvas-title">Capa de Ozono</h2>
          <p className="canvas-description">
            La capa de ozono es una barrera protectora en la atmósfera que absorbe la mayor parte de la radiación ultravioleta del sol, pero está siendo dañada por contaminantes.
          </p>
        </div>

        {/* Canvas del Efecto Invernadero */}
        <div className="canvas-container" onClick={() => navigate("/green-house")}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 5]} intensity={1} />
            <OrbitControls enablePan={false} enableZoom={false} />
            <RotatingCube />
          </Canvas>
          <h2 className="canvas-title">Efecto Invernadero</h2>
          <p className="canvas-description">
          El efecto invernadero es el proceso por el cual ciertos
          gases atrapan el calor en la atmósfera, manteniendo la Tierra habitable.
          Sin embargo, las actividades humanas han intensificado este fenómeno,
          provocando el calentamiento global y sus efectos: aumento de temperaturas,
          derretimiento de glaciares y fenómenos climáticos extremos.
          </p>
        </div>

        {/* Canvas del Smog */}
        <div className="canvas-container" onClick={() => navigate("/smog")}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 5]} intensity={1} />
            <OrbitControls enablePan={false} enableZoom={false} />
            <RotatingCube />
          </Canvas>
          <h2 className="canvas-title">Smog</h2>
          <p className="canvas-description">
            El smog es una forma de contaminación del aire formada principalmente por emisiones de vehículos y fábricas, que afecta la salud y reduce la visibilidad.
          </p>
        </div>
      </div>
    </div>
  );
};

export default World;

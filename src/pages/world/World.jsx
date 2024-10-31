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
import useAuthStore from "../../stores/use-auth-store"; // Zustand store for managing authentication state

// RotatingCube - A simple rotating cube as a placeholder for future 3D models.
const RotatingCube = () => {
  const cubeRef = useRef();

  // Rotate the cube slightly on each frame render
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

// Title3D - Component to render the 3D title and move it with mouse.
const Title3D = () => {
  const font = new FontLoader().load("/path/to/font.json"); // Replace with your font path
  const titleRef = useRef();

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Update mouse position on mouse move
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

  // Update title position based on mouse position
  useFrame(() => {
    if (titleRef.current) {
      titleRef.current.position.x = mouse.x * 1.5; // Adjust the multiplier for sensitivity
      titleRef.current.position.y = mouse.y * 1.5; // Adjust the multiplier for sensitivity
    }
  });

  return (
    <Text
      ref={titleRef}
      font={font}
      scale={[3, 3, 3]} // Adjust scale for smaller text
      position={[8, 1.5, -4]} // Position in the scene, adjusted to be closer to the camera
      color="#000000" // Text color
    >
      Problemas medioambientales del aire
    </Text>
  );
};

// World - Main component rendering the title and 3D placeholders.
const World = () => {
const { user, setUser, loading, observeAuthState } = useAuthStore(); // Zustand store to manage current user state and loading
  const navigate = useNavigate();

  if(!user){
    navigate("/");
  }

  return (
    <div className="world-container">
      <UserInfo />

      {/* 3D title */}
      <Canvas style={{ height: "200px", width: "100%" }}>
        {" "}
        {/* Adjust height and width */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 5]} intensity={1} />
        <OrbitControls enablePan={false} enableZoom={false} />
        <Title3D />
      </Canvas>

      {/* 3D placeholders for each environmental issue */}
      <div className="canvas-row">
        {/* Ozone Layer Canvas */}
        <div className="canvas-container" onClick={() => navigate("/ozone-layer")}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 5]} intensity={1} />
            <OrbitControls enablePan={false} enableZoom={false} />
            <RotatingCube />
          </Canvas>
          <h2 className="canvas-title">Capa de Ozono</h2>
          <p className="canvas-description">
            Breve texto que describa el problema de la capa de ozono.
          </p>
        </div>

        {/* Greenhouse Effect Canvas */}
        <div className="canvas-container" onClick={() => navigate("/green-house")}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 5]} intensity={1} />
            <OrbitControls enablePan={false} enableZoom={false} />
            <RotatingCube />
          </Canvas>
          <h2 className="canvas-title">Efecto Invernadero</h2>
          <p className="canvas-description">
            Breve texto sobre el impacto del efecto invernadero.
          </p>
        </div>

        {/* Smog Canvas */}
        <div className="canvas-container" onClick={() => navigate("/smog")}>
          <Canvas>
            <ambientLight intensity={0.5} />
            <directionalLight position={[2, 2, 5]} intensity={1} />
            <OrbitControls enablePan={false} enableZoom={false} />
            <RotatingCube />
          </Canvas>
          <h2 className="canvas-title">Smog</h2>
          <p className="canvas-description">
            Descripción corta sobre el smog y sus efectos.
          </p>
        </div>
      </div>
    </div>
  );
};

export default World;

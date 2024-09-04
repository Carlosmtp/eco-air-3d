/**
 * @file World.jsx
 * @description This file defines the `World` component, which renders a 3D scene using React Three Fiber and Drei utilities.
 * @date Created: 03/09/2024
 * @date Last Modified: 04/09/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 */

/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Sphere from "./Sphere";
import "./World.css";

/**
 * @component World
 * @description The `World` component renders a 3D scene using React Three Fiber and Drei utilities, 
 * including a sphere with lighting and interactive camera controls.
 * @returns {JSX.Element} A JSX element containing a 3D scene with a sphere, ambient light, directional light, 
 * and orbit controls for interaction.
 * @example
 * // Example usage:
 * <World />
 */
const World = () => {
  return (
    <div className="world-container">
      <React.Fragment>
        <Canvas>
          <OrbitControls enablePan={false} />
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 10, 0]} intensity={4} />
          <Sphere />
        </Canvas>
      </React.Fragment>
    </div>
  );
};

export default World;

/** 
 * @file World.jsx
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
import { MapControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import "./World.css";
import UserInfo from "./UserInfo";

/**
 * @component World
 * @description A 3D world component displaying a scene with a sphere and providing an exit button to sign out the user. 
 * @returns {JSX.Element} The 3D world scene with a button for signing out.
 * @example
 * // Renders the World component with a sign-out button and a 3D scene:
 * <World />
 */
const World = () => {
  return (
    <div className="world-container">
      <UserInfo />
      <React.Fragment>
        <Canvas>
          <MapControls enablePan={false}/>
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 100, 0]} intensity={7} />
        </Canvas>
      </React.Fragment>
    </div>
  );
};

export default World;
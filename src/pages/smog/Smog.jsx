/**
 * @file Smog.jsx
 * @description This component renders an empty 3D canvas as a placeholder for the Smog scene.
 * @date Created: 27/10/2024
 * @authors
 * Carlos Mauricio Tovar Parra - carlos.mauricio.tovar@correounivalle.edu.co
 */

import { Canvas } from "@react-three/fiber";
import UserInfo from "../world/UserInfo";
import LittleCity from "./LittleCity";
import "./Smog.css"
const Smog = () => {
  return (
    <div className="smog-container">
      <UserInfo /> <div className="city-container">
      <Canvas>
        <directionalLight position={[5, 5, 5]} intensity={5} />
        <LittleCity 
        scale={[1.5, 1.5, 1.5]}/>
      </Canvas>
      </div>
    </div>
  );
};

export default Smog;

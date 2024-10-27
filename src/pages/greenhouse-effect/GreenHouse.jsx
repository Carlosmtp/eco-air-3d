/**
 * @file GreenHouse.jsx
 * @description This component renders an empty 3D canvas as a placeholder for the Greenhouse Effect scene.
 * @date Created: 27/10/2024
 * @authors
 * Carlos Mauricio Tovar Parra - carlos.mauricio.tovar@correounivalle.edu.co
 */

import { Canvas } from "@react-three/fiber";
import UserInfo from "../world/UserInfo";

const GreenHouse = () => {
  return (
    <div className="greenhouse-container">
      <UserInfo />
      <Canvas>{/* Empty canvas for GreenHouse component */}</Canvas>
    </div>
  );
};

export default GreenHouse;

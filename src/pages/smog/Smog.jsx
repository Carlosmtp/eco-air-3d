/**
 * @file Smog.jsx
 * @description This component renders an empty 3D canvas as a placeholder for the Smog scene.
 * @date Created: 27/10/2024
 * @authors
 * Carlos Mauricio Tovar Parra - carlos.mauricio.tovar@correounivalle.edu.co
 */

import { Canvas } from "@react-three/fiber";
import UserInfo from "../world/UserInfo";

const Smog = () => {
  return (
    <div className="smog-container">
      <UserInfo />
      <Canvas>{/* Empty canvas for Smog component */}</Canvas>
    </div>
  );
};

export default Smog;

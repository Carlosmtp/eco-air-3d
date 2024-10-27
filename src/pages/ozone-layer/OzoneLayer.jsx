/**
 * @file OzoneLayer.jsx
 * @description This component renders an empty 3D canvas as a placeholder for the Ozone Layer scene.
 * @date Created: 27/10/2024
 * @authors
 * Carlos Mauricio Tovar Parra - carlos.mauricio.tovar@correounivalle.edu.co
 */

import { Canvas } from "@react-three/fiber";
import UserInfo from "../world/UserInfo";

const OzoneLayer = () => {
  return (
    <div className="ozone-layer-container">
      <UserInfo />
      <Canvas>{/* Empty canvas for Ozone Layer component */}</Canvas>
    </div>
  );
};

export default OzoneLayer;

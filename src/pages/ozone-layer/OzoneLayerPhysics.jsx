/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import { Box } from "@react-three/drei"; 
import UserInfo from "../world/UserInfo";
import City from "./City";

const OzoneLayerPhysics = () => {
  return (
    <div className="ozone-layer-container">
      <UserInfo />
      <div className="ozone-simulation-canvas">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 70 }}>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
          
          {/* Ciudades */}
          <City position={[-4, -7.5, 0]} scale={[2.1, 2.1, 2.1]} />
          <City position={[5, -7.5, 0]} scale={[2.1, 2.1, 2.1]} />
          
          {/* Rectángulo delgado simulando la capa de ozono */}
          <Box 
            args={[22, 0.5, 5]} // Largo, altura (grosor), ancho
            position={[0, 0, 0]} 
          >
            <meshStandardMaterial 
              color="blue" 
              transparent 
              opacity={0.3} // Semitransparente
            />
          </Box>
        </Canvas>
      </div>
    </div>
  );
};

export default OzoneLayerPhysics;

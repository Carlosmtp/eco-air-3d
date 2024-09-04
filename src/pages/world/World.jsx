/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Sphere from "./Sphere";
import "./World.css";

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

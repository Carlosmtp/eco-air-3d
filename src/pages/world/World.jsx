/* eslint-disable react/no-unknown-property */
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React from "react";
import Sphere from "./Sphere";
import "./World.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import useAuthStore from "../../stores/use-auth-store";

const World = () => {

  const navigate = useNavigate();
  const { user, setUser } = useAuthStore();
  const auth = getAuth();
  const db = getFirestore();

  const handleExit = async () => {
    try {
      if (user) {
        await deleteDoc(doc(db, "users", user.uid));
      }

      await signOut(auth);

      setUser(null);
    
      navigate("/");
    } catch (error) {
      console.error("Error al salir:", error);
      
    }
  };


  return (
    <div className="world-container">
      <button className="exit-button" onClick={handleExit}>
        Exit
      </button>
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
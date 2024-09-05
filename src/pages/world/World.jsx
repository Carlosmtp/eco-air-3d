/** 
 * @file World.js
 * @description This component renders a 3D world with a sphere, lights, and orbit controls using react-three-fiber. 
 *              It also provides an exit button to sign out the user.
 * @date Created: 03/09/2024
 * @date Last Modified: 05/09/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 * @author Jhoimar Enrique Silva Torres
 *         jhoimar.silva@correounivalle.edu.co
 */

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

/**
 * @component World
 * @description A 3D world component displaying a scene with a sphere and providing an exit button to sign out the user. 
 * @returns {JSX.Element} The 3D world scene with a button for signing out.
 * @example
 * // Renders the World component with a sign-out button and a 3D scene:
 * <World />
 */
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
          <ambientLight intensity={0.5} />
          <directionalLight position={[3, 100, 0]} intensity={7} />
          <Sphere />
        </Canvas>
      </React.Fragment>
    </div>
  );
};

export default World;
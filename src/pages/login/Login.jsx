/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/**
 * @file Login.jsx
 * @description This is the file responsible for generating the login component, where you log in with a Google account at the beginning.
 * @date Created: 29/10/2024
 * @date Last Modified: 1/11/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 * @author Jhoimar Enrique Silva Torres
 *         jhoimar.silva@correounivalle.edu.co
 */
import { Canvas } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import useAuthStore from "../../stores/use-auth-store";
import { BsGoogle } from "react-icons/bs";
import "./Login.css";
import logoTypeEccode from "../../assets/ecocode-logo-type.png";
import LoginScene from "./LoginScene";
import Earth from "./Earth";
import Clouds from "./Clouds";

const Login = () => {
  const { user, loginGoogleWithPopUp, observeAuthState } = useAuthStore();
  const navigate = useNavigate();

  // Estado para la posición de la cámara y nubes
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);
  const [cloudsPosition, setCloudsPosition] = useState([0, 0, 3.7]);

  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  useEffect(() => {
    if (user) {
      navigate("/Welcome");
    }
  }, [user, navigate]);

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp();
  }, [loginGoogleWithPopUp]);

  // Manejar movimiento del mouse
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 2 - 1;
    const y = -(clientY / window.innerHeight) * 2 + 1;

    setCameraPosition([x, y, 5]);

    const newCloudsX = x * 0.5;
    const newCloudsY = y * 0.5;
    const cloudLimit = 0.3;
    const clampedX = Math.max(-cloudLimit, Math.min(cloudLimit, newCloudsX));
    const clampedY = Math.max(-cloudLimit, Math.min(cloudLimit, newCloudsY));

    setCloudsPosition([clampedX, clampedY, 3.5]);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="contenedor-login">
      <LoginScene />
      <div className="card">
        <Canvas shadows className="illustration">
          <ambientLight intensity={1} color={"#FFFFFF"} />
          <directionalLight
          position={[2, 2, 5]}
          intensity={4}
            color={"white"}
            angle={Math.PI / 2}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={10}
            shadow-camera-near={0.1}
          >
            </directionalLight>
          <Clouds position={cloudsPosition} scale={[3, 3, 3]}/>
          <perspectiveCamera position={cameraPosition} fov={75} />
          <Earth position={[0, 0, 0.9]} scale={[2.5, 2.5, 2.5]}/>
        </Canvas>
        <h1>EcoAir3D APP</h1>
        <button className="button" onClick={handleLogin}>
          <BsGoogle />
          Sign in with Google
        </button>
        <img
          className="logo-type"
          src={logoTypeEccode}
          alt="Eccode Studio Logo Type"
        />
      </div>
    </div>
  );
};

export default Login;

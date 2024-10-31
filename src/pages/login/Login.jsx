/* eslint-disable react/no-unknown-property */
/**
 * @file Login.jsx
 * @description This is the file responsible for generating the login component, where you log in with a Google account at the beginning.
 * @date Created: 29/08/2024
 * @date Last Modified: 24/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 * @author Jhoimar Enrique Silva Torres
 *         jhoimar.silva@correounivalle.edu.co
 */

import { Canvas, useFrame } from "@react-three/fiber";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import { BsGoogle } from "react-icons/bs";
import { useRef } from "react";
import "./Login.css";
import logoTypeEccode from "../../assets/ecocode-logo-type.png";
import LoginScene from "./LoginScene";

/**
 * @component Cube
 * @description A 3D cube that rotates continuously.
 * @returns {JSX.Element} A rotating cube.
 */
const Cube = () => {
  // Create a reference for the mesh
  const meshRef = useRef();

  // Use the frame hook to animate the cube
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01; // Rotate on x-axis
      meshRef.current.rotation.y += 0.01; // Rotate on y-axis
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

const Login = () => {
  const { user, loginGoogleWithPopUp, observeAuthState } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  useEffect(() => {
    if (user) {
      navigate("/World");
    }
  }, [user, navigate]);

  const handleLogin = useCallback(() => {
    loginGoogleWithPopUp();
  }, [loginGoogleWithPopUp]);

  return (
    <div className="contenedor-login">
      <LoginScene />
      <div className="card">
        <Canvas className="illustration">
        <ambientLight intensity={0.5} color={"#ffffff"} />
          <pointLight position={[5, 5, 5]} intensity={1.2} color={"#ffffff"} />
          <directionalLight position={[-5, -5, 5]} intensity={0.7} color={"#ffffff"} />
          <Cube />
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

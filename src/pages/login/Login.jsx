/**
 * @file Login.jsx
 * @description This is the file responsible for generating the login component, where you log in with a Google account at the beginning.
 * @date Created: 29/08/2024
 * @date Last Modified: 03/09/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 * @note None
 */

import illustration from "../../assets/illustration.png";
import logoTypeEccode from "../../assets/ecocode-logo-type.png";
import { BsGoogle } from "react-icons/bs";
import "./Login.css";
import { useCallback, useEffect } from 'react';
import useAuthStore from "../../stores/use-auth-store"
import { useNavigate } from "react-router-dom";
//import UserDAO from "../../dao/UserDAO";
/**
 * @component Login
 * @description A simple login component that displays the logo, a tagline, and a Google sign-in button.
 * @returns {JSX.Element} A container with a card displaying the Eccode Studio logo, name, tagline, and a Google sign-in button.
 * @example
 * // Example usage:
 * <Login />
 */

const Login = () => {
  const {user, loginGoogleWithPopUp, observeAuthState, loading } =
    useAuthStore();  
  const navigate = useNavigate ();

  useEffect(()=>{
    observeAuthState();
  }, [observeAuthState]);

  useEffect(()=>{
    if (user) {
      const newUser = {
        email: user.email,
        name: user.displayname,
        photo: user.photoURL,
      };
      navigate("/World")

    }
  }, [user, navigate]);

  const handleLogin = useCallback (() => {
    loginGoogleWithPopUp(); 
  }, [loginGoogleWithPopUp]);

  return (
    <div className="contenedor-login">
      <div className="card">
        <img className="illustration" src={illustration} alt="Eccode Studio Logo" />
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
}

export default Login;
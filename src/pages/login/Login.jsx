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
import logoTypeEccode from "../../assets/ecocode-logo-type.svg";
import { BsGoogle } from "react-icons/bs";
import "./Login.css";

/**
 * @component Login
 * @description A simple login component that displays the logo, a tagline, and a Google sign-in button.
 * @returns {JSX.Element} A container with a card displaying the Eccode Studio logo, name, tagline, and a Google sign-in button.
 * @example
 * // Example usage:
 * <Login />
 */
export default function Login() {
  return (
    <div className="contenedor-login">
      <div className="card">
        <img className="illustration" src={illustration} alt="Eccode Studio Logo" />
        <h1>EcoAir3D APP</h1>
        <button className="button">
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

/**
 * @file Login.jsx
 * @description This is the file responsible for generating the login component, where you log in with a Google account at the beginning.
 * @date Created: 03/09/2024
 * @date Last Modified: 29/08/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 * @note None
*/

import logo from '../../assets/logo.png';
import { BsGoogle } from "react-icons/bs";
import './Login.css';

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
    <div className="container">
      <div className="card">
        <img src={logo} alt="Eccode Studio Logo" style={{ width: '200px', height: 'auto', marginBottom: '1rem' }} />

        <h1>ECCODE STUDIO</h1>
        <p>INNOVATING FOR CLEAN AIR</p>

        <button className="button">
          <BsGoogle/>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

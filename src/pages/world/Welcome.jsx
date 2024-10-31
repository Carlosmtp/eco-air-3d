/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */
/**
 * @file World.jsx
 * @description This component serves as the main welcome screen for a 3D environmental exploration application. 
 * It displays a welcome message and an information card that introduces users to the challenges affecting the atmosphere, 
 * including pollution, climate change, and air quality deterioration. The component uses Zustand for authentication state management 
 * and React Router for navigation.
 * @date Created: 31/10/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 */

import "./World.css";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store"; // Authentication state with Zustand
import { useState } from "react"; // Ensure useState is imported
import UserInfo from "./UserInfo"; // Ensure UserInfo component is available
import LoginScene from "../login/LoginScene";

// Info card component
const InfoCard = ({ onClose }) => {
  const navigate = useNavigate();

  const handleEnter = () => {
    onClose(); // Close the info card
    setTimeout(() => {
      navigate("/World"); // Navigate to the World page after closing
    }, 300); // Wait to ensure the card closes first
  };

  return (
    <>
      <LoginScene />
      <div className="info-card">
        <h2>Bienvenido al Mundo 3D</h2>
        <p>
          Bienvenido a nuestra aplicación 3D, donde podrás sumergirte en la
          exploración de los desafíos ambientales que afectan nuestra atmósfera.
          A medida que navegues por esta experiencia interactiva, descubrirás
          cómo factores como la contaminación, el cambio climático y el
          deterioro de la calidad del aire impactan no solo nuestro entorno,
          sino también nuestra salud y bienestar. Nuestro objetivo es brindarte
          información accesible y motivarte a tomar acciones positivas para
          proteger el aire que respiramos. ¡Únete a nosotros en esta aventura
          hacia un futuro más sostenible! En este mundo 3D, exploraremos los
          problemas medioambientales relacionados con el aire, incluyendo la
          capa de ozono, el efecto invernadero y el smog. Haz clic en cada cubo
          para aprender más sobre cada tema.
        </p>
        <button onClick={handleEnter}>Entrar</button>
      </div>
    </>
  );
};

// Welcome - Main component that renders the title and 3D placeholders.
const Welcome = () => {
  const { user } = useAuthStore(); // Current user state
  const navigate = useNavigate();
  const [showInfoCard, setShowInfoCard] = useState(true); // State to control the visibility of the info card

  // If there is no authenticated user, redirect to the home page
  if (!user) {
    navigate("/");
    return null; // Ensure to return null if there is no user
  }

  const handleCloseCard = () => {
    setShowInfoCard(false); // Close the info card
  };

  return (
    <div className="world-container">
      <UserInfo />

      {/* Show info card if the state allows */}
      {showInfoCard && <InfoCard onClose={handleCloseCard} />}
    </div>
  );
};

export default Welcome;

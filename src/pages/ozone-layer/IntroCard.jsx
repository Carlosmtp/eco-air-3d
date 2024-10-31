/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/**
 * @file IntroCard.jsx
 * @description This file defines the `IntroCard` component, which displays introductory information about the Ozone Layer and its importance for life on Earth.
 * @date Created: 31/10/2024
 * @date Last Modified: 31/10/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 */

import './OzoneLayer.css'; // CSS file for the card

const IntroCard = () => {
  return (
    <div className="intro-card">
      <h2>La Capa de Ozono</h2>
      <p>
        La capa de ozono es esencial para la vida en la Tierra. 
        Actúa como un escudo que protege a nuestro planeta de la dañina radiación UV del sol.
      </p>
      <p>
        Proteger nuestra capa de ozono es vital para prevenir efectos adversos en la salud 
        humana y el medio ambiente, como el aumento de casos de cáncer de piel y daños a 
        los ecosistemas.
      </p>
    </div>
  );
};

export default IntroCard;

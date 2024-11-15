/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/**
 * @file IntroCard.jsx
 * @description This file defines the `IntroCard` component, which displays detailed and interactive information about the Ozone Layer and its importance for life on Earth.
 * @date Created: 15/11/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 */

import './OzoneLayer.css'; // CSS file for the card
import { useState } from 'react';

const IntroCard = () => {
  const [section, setSection] = useState('overview');

  const handleNavigation = (sectionName) => {
    setSection(sectionName);
  };

  return (
    <div className="intro-card">      
      <nav className="navigation">
        <button onClick={() => handleNavigation('overview')}>Visión General</button>
        <button onClick={() => handleNavigation('importance')}>Importancia</button>
        <button onClick={() => handleNavigation('threats')}>Amenazas</button>
        <button onClick={() => handleNavigation('protection')}>Protección</button>
        <button onClick={() => handleNavigation('awareness')}>Sensibilización</button> {/* Nueva sección */}
      </nav>

      {section === 'overview' && (
        <div className="section-content">
          <p>
            La capa de ozono es una capa de gas que se encuentra en la estratósfera,
            aproximadamente a 20-30 kilómetros de la superficie de la Tierra. Está compuesta 
            principalmente por ozono (O₃) y juega un papel crucial al filtrar la radiación 
            ultravioleta (UV) del sol.
          </p>
          <p>
            Aunque su nombre puede sugerirlo, la capa de ozono no es una capa sólida, sino 
            que se trata de una concentración relativamente alta de ozono en esta región.
          </p>
        </div>
      )}

      {section === 'importance' && (
        <div className="section-content">
          <p>
            La capa de ozono es esencial para la vida en la Tierra. Al filtrar la radiación UV 
            dañina, ayuda a proteger la salud humana, reduciendo el riesgo de cáncer de piel, 
            cataratas y otras afecciones relacionadas con la exposición al sol.
          </p>
          <p>
            Además, protege los ecosistemas marinos, terrestres y la biodiversidad al reducir 
            los efectos dañinos de la radiación ultravioleta, que pueden alterar la fotosíntesis 
            y las cadenas alimenticias.
          </p>
        </div>
      )}

      {section === 'threats' && (
        <div className="section-content">
          <p>
            Las principales amenazas para la capa de ozono provienen de sustancias químicas, 
            especialmente los clorofluorocarbonos (CFC), que destruyen las moléculas de ozono 
            en la estratósfera.
          </p>
          <p>
            A pesar de los esfuerzos internacionales como el Protocolo de Montreal, que busca 
            eliminar el uso de estos productos químicos, el daño sigue siendo una preocupación 
            global.
          </p>
        </div>
      )}

      {section === 'protection' && (
        <div className="section-content">
          <p>
            Para proteger la capa de ozono, es crucial reducir la emisión de sustancias 
            que la dañan, como los CFC, halones, y otros productos químicos que contienen 
            cloro y bromo.
          </p>
          <p>
            El uso de tecnologías alternativas, como refrigerantes y aerosoles sin CFC, 
            y la promoción de políticas ambientales globales son esenciales para preservar 
            la capa de ozono para las futuras generaciones.
          </p>
        </div>
      )}

      {section === 'awareness' && ( // Nueva sección de sensibilización
        <div className="section-content">
          <h2>¡Es hora de actuar por el futuro del planeta!</h2>
          <p>
            Todos podemos contribuir a proteger la capa de ozono. Reduciendo el uso de productos que contienen CFC,
            apoyando políticas ambientales y educándonos sobre la importancia de esta capa vital, podemos marcar una diferencia.
          </p>
          <p>
            A continuación, te invitamos a interactuar con este breve cuestionario para aprender más sobre cómo puedes contribuir:
          </p>
          <div className="interactive-content">
            <button onClick={() => alert('¡Gracias por tu interés en proteger el planeta!')}>Realizar cuestionario</button>
            <p><strong>¡Haz tu parte para el futuro!</strong></p>
          </div>
        </div>
      )}

    </div>
  );
};

export default IntroCard;

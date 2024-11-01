/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/**
 * @file Intro.jsx
 * @description This file defines the `Intro` component. 
 * @date Created: 31/10/2024
 * @date Last Modified: 31/10/2024
 * @author Jhoimar Silva Torres
 *         jhoimar.silva@correounivalle.edu.co
 */

import './Smog.css';

const Intro = () => {
  return (
    <div className="Intro">
      <h2>Smog</h2>
      <p>
      El smog es una mezcla de humo y neblina que se forma en áreas urbanas e industrializadas
        debido a la contaminación del aire. Este fenómeno se genera principalmente por:
      </p>
      <p>
      Emisiones de vehículos: Los gases de escape de automóviles y camiones.
    Contaminación industrial: Las fábricas que queman combustibles fósiles.
    Condiciones climáticas: Altas temperaturas y falta de viento que atrapan contaminantes cerca del suelo.
      </p>
    </div>
  );
};

export default Intro;

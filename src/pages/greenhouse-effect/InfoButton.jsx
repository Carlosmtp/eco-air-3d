// InfoButton.jsx
import React from 'react';

const InfoButton = ({ toggleModal }) => {
  return (
    <button className="info-button" onClick={toggleModal}>
      Más Información
    </button>
  );
};

export default InfoButton;

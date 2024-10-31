// ZoomButton.jsx
import React from 'react';

const ZoomButton = ({ zoomedIn, toggleZoom }) => {
  return (
    <button className="zoom-button" onClick={toggleZoom}>
      {zoomedIn ? 'Alejar' : 'Acercar'}
    </button>
  );
};

export default ZoomButton;

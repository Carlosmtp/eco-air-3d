/**
 * @file GreenHouse.jsx
 * ZoomButton component that renders a button to toggle zoom in/out on a 3D scene.
 * @param {boolean} zoomedIn - Boolean indicating the current zoom state; true if zoomed in.
 * @param {Function} toggleZoom - Function to toggle the zoom state.
 * @returns {JSX.Element} A button labeled "Acercar" or "Alejar" based on zoom state.
 * @returns {JSX.Element} A fully interactive 3D greenhouse simulation.
* @date Created: 31/10/2024
 * @updated: 31/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

const ZoomButton = ({ zoomedIn, toggleZoom }) => {
    return (
      <button className="zoom-button" onClick={toggleZoom}>
        {zoomedIn ? 'Alejar' : 'Acercar'}
      </button>
    );
  };

  export default ZoomButton;


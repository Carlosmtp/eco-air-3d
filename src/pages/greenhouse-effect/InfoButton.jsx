/**
 * @file InfoButton.jsx
 * @description InfoButton component that renders a button to toggle the visibility of an information modal.
 * @param {Function} toggleModal - Function to toggle the visibility of the info modal.
 * @returns {JSX.Element} A button labeled "Más Información" to open or close the modal.
  @date Created: 31/10/2024
 * @updated: 31/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */
const InfoButton = ({ toggleModal }) => {
    return (
      <button className="info-button" onClick={toggleModal}>
        Más Información
      </button>
    );
  };

  export default InfoButton;

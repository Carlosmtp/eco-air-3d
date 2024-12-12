/**
 * @file CollectorGame.jsx
 * @description This component is the one in charge of the entire minigame in general of the quiz tab.
 * @date Created: 03/12/2024
 * @updated: 11/12/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 *
 */

import useAuthStore from "../../stores/use-auth-store";
import "./Quiz.css";
import UserInfo from "../world/UserInfo";
import CollectorGame from "./CollectorGame";

const Quiz = () => {
  const { user, updatePuntuacion } = useAuthStore();

  const handleScoreIncrease = () => {
    if (user) {
      updatePuntuacion(1, true); // Aumentar puntuación en 1
    }
  };

  const handleScoreDecrease = () => {
    if (user && user.puntuacion > 0) {
      updatePuntuacion(1, false); // Disminuir puntuación en 1
    }
  };

  return (
    <>
      <UserInfo />
      <div className="quiz-container">
        <CollectorGame />
      </div>
    </>
  );
};

export default Quiz;

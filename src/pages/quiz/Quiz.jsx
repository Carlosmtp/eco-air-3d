import useAuthStore from "../../stores/use-auth-store";
import "./Quiz.css";
import UserInfo from "../world/UserInfo";

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
      {user ? (
        <>
          <h2>{`Bienvenido, ${user.displayName}`}</h2>
          <p>{`Tu puntuación actual: ${user.puntuacion}`}</p>
          <div className="score-buttons">
            <button onClick={handleScoreIncrease}>Aumentar puntuación</button>
            <button onClick={handleScoreDecrease}>Bajar puntuación</button>
          </div>
        </>
      ) : (
        <p>No estás logueado.</p>
      )}
    </div>
    </>
  );
};

export default Quiz;

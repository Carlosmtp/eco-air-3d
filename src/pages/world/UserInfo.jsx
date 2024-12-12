import "./UserInfo.css";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import useAuthStore from "../../stores/use-auth-store";
import { useEffect } from "react";

const UserInfo = () => {
  const navigate = useNavigate();
  const { user, setUser, loading, observeAuthState } = useAuthStore();
  const auth = getAuth();

  useEffect(() => {
    observeAuthState();
  }, [observeAuthState]);

  const handleExit = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/");
    } catch (error) {
      console.error("Error while exiting:", error);
    }
  };

  if (loading) {
    return <p>Loading user information...</p>;
  }

  return (
    <div className="top-bar">
      <div className="user-info">
        {user && user.photoURL ? (
          <div className="profile-container">
            <img
              className="user-photo"
              src={user.photoURL}
              alt="User Profile"
              crossOrigin="anonymous"
            />
            <div className="score-circle">{user.puntuacion}</div>
          </div>
        ) : (
          <div className="profile-container">
            <img
              className="user-photo"
              src="default-profile.png"
              alt="Default Profile"
            />
            <div className="score-circle">{user ? user.puntuacion : 0}</div>
          </div>
        )}

        {user && user.displayName ? (
          <h1 className="user-name">{user.displayName}</h1>
        ) : (
          <h1 className="user-name">Anonymous User</h1>
        )}
      </div>

      <div className="buttons-container">
        <button
          className="top-button"
          onClick={() =>
            navigate("/welcome", { state: { scrollPosition: 140 } })
          }
        >
          Inicio
        </button>
        <button
          className="top-button"
          onClick={() =>
            navigate("/quiz")
          }
        >
          Minijuego
        </button>
        <button
          className="top-button"
          onClick={() =>
            navigate("/top-ten")
          }
        >
          Puntuaciones
        </button>
        <button className="exit-button" onClick={handleExit}>
          Salir
        </button>
      </div>
    </div>
  );
};

export default UserInfo;

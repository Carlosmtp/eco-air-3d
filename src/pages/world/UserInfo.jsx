/**
 * @file UserInfo.js
 * @description This component displays the user's information (photo and name) and provides an exit button to sign out.
 * @date Created: 05/09/2024
 * @date Last Modified: 31/10/2024
 * @author Carlos Mauricio Tovar Parra
 */ import "./UserInfo.css";
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

  console.log("User data:", user);

  return (
    <>
      <div className="user-info">
        {user && user.photoURL ? (
          <img
            className="user-photo"
            src={user.photoURL}
            alt="User Profile"
            crossOrigin="anonymous"
          />
        ) : (
          <img
            className="user-photo"
            src="default-profile.png"
            alt="Default Profile"
          />
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
            alert("Top 10 feature is currently under development.")
          }
        >
          Puntuaciones
        </button>
        <button className="exit-button" onClick={handleExit}>
          Salir
        </button>
      </div>
    </>
  );
};

export default UserInfo;

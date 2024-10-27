/**
 * @file UserInfo.js
 * @description This component displays the user's information (photo and name) and provides an exit button to sign out.
 * @date Created: 05/09/2024
 * @date Last Modified: 24/10/2024
 * @author Carlos Mauricio Tovar Parra
 */

import "./UserInfo.css"; // Styles specific to this component
import { useNavigate } from "react-router-dom"; // Navigation hook from react-router
import { getAuth, signOut } from "firebase/auth"; // Firebase authentication services
import useAuthStore from "../../stores/use-auth-store"; // Zustand store for managing authentication state
import { useEffect } from "react"; // For managing side effects

/**
 * @component UserInfo
 * @description A component that displays the authenticated user's profile picture and name.
 *              It also provides a button to sign out.
 * @returns {JSX.Element} A JSX element displaying the user's profile info and an exit button.
 */
const UserInfo = () => {
  const navigate = useNavigate(); // Navigation hook to redirect user
  const { user, setUser, loading, observeAuthState } = useAuthStore(); // Zustand store to manage current user state and loading
  const auth = getAuth(); // Firebase authentication instance

  // Observe authentication state when the component mounts
  useEffect(() => {
    observeAuthState(); // Call this function to monitor the authentication state
  }, [observeAuthState]);

  /**
   * @function handleExit
   * @description Signs the user out of Firebase, and navigates them back to the home page.
   * @async
   * @throws {Error} Logs an error if the document deletion or sign-out process fails.
   */
  const handleExit = async () => {
    try {
      // Sign out the user from Firebase Authentication
      await signOut(auth);

      // Clear user from Zustand store
      setUser(null);

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.error("Error while exiting:", error);
    }
  };

  if (loading) {
    // Display a loading state while authentication data is being fetched
    return <p>Loading user information...</p>;
  }
  const photo = user.photoURL;
  //alert(photo);
  return (
    <>
      <div className="user-info">
        {/* Conditionally rendering the user photo */}
        {user && user.photoURL ? (
          <img className="user-photo" src={photo} alt="User Profile" crossOrigin="anonymous">
          {console.log(photo)}
          </img>
        ) : (
          <img
            className="user-photo"
            src="default-profile.png" // Default image path
            alt="Default Profile"
          />
        )}

        {/* Conditionally rendering the user's display name */}
        {user && user.displayName ? (
          <h1 className="user-name">{user.displayName}</h1>
        ) : (
          <h1 className="user-name">Anonymous User</h1>
        )}
      </div>

      <div className="buttons-container">
        <button className="top-button" onClick={() => alert("Top 10 feature is currently under development.")}>
          Top 10
        </button>
        <button className="exit-button" onClick={handleExit}>
          Exit
        </button>
      </div>
    </>
  );
};

export default UserInfo;

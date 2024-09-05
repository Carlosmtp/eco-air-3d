/** 
 * @file UserInfo.js
 * @description This component displays the user's information (photo and name) and provides an exit button to sign out.
 * @date Created: 05/09/2024
 * @date Last Modified: 05/09/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 */

import "./UserInfo.css"; // Styles specific to this component
import { useNavigate } from "react-router-dom"; // Navigation hook from react-router
import { getAuth, signOut } from "firebase/auth"; // Firebase authentication services
import { getFirestore, doc, deleteDoc } from "firebase/firestore"; // Firebase Firestore services
import useAuthStore from "../../stores/use-auth-store"; // Zustand store for managing authentication state

/**
 * @component UserInfo
 * @description A component that displays the authenticated user's profile picture and name. 
 *              It also provides a button to sign out.
 * @returns {JSX.Element} A JSX element displaying the user's profile info and an exit button.
 * @example
 * // Renders the UserInfo component:
 * <UserInfo />
 */
const UserInfo = () => {
  const navigate = useNavigate(); // Navigation hook to redirect user
  const { user, setUser } = useAuthStore(); // Zustand store to manage current user state
  const auth = getAuth(); // Firebase authentication instance
  const db = getFirestore(); // Firebase Firestore instance

  /**
   * @function handleExit
   * @description Signs the user out of Firebase, and navigates them back to the home page.
   * @async
   * @throws {Error} Logs an error if the document deletion or sign-out process fails.
   * @example
   * // Triggers the exit process when the button is clicked:
   * handleExit();
   */
  const handleExit = async () => {
    try {
      if (user) {
        // Delete user document from Firestore if the user exists
        await deleteDoc(doc(db, "users", user.uid));
      }
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

  return (
    <>
      <div className="user-info">
        <img className="user-photo" src={user.photoURL} alt="User Profile" /> {/* Displays user's profile picture */}
        <h1 className="user-name">{user.displayName}</h1> {/* Displays user's display name */}
      </div>
      
      <button className="exit-button" onClick={handleExit}>
        Exit
      </button>
    </>
  );
};

export default UserInfo;

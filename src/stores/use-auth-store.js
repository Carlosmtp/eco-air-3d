/** 
 * @file useAuthStore.js
 * @description This file defines a Zustand store for managing authentication state within the web application. It provides methods for logging in with Google via a popup, logging out, and observing changes in the user's authentication state.
 * @date Created: 28/08/2024
 * @date Last Modified: 28/08/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 * @note Ensure that Firebase authentication settings and methods are properly configured to maintain secure user sessions.
 */

import { create } from "zustand";
import { GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { signInWithPopup } from "firebase/auth/web-extension";
import { auth } from "../firebase.config";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({
    user: null, // Stores the current authenticated user
    loading: true, // Indicates whether the authentication state is being loaded

    /**
     * @function loginGoogleWithPopUp
     * @description Initiates a Google sign-in process using a popup window. 
     * If an error occurs during the sign-in, it logs the error to the console.
     * @async
     * @throws {FirebaseError} If an error occurs during the sign-in process.
     * @example
     * * // Example usage in a React component:
     * const handleLogin = useCallback(() => {
     *    loginGoogleWithPopUp();
     * }, [loginGoogleWithPopUp]);
     */
    loginGoogleWithPopUp: async () => {
        await signInWithPopup(auth, provider).catch((error) => {
            console.log(error);
        });
    },

    /**
     * @function logout
     * @description Logs out the current user from the application.
     * If an error occurs during the sign-out process, it logs the error to the console.
     * @async
     * @throws {FirebaseError} If an error occurs during the sign-out process.
     * @example
     * // Example usage in a React component:
    * const handleLogout = useCallback(() => {
    *    logout();
    * }, [logout]);
    */
    logout: async () => {
        await signOut(auth).catch((error) => {
            console.log(error);
        });
    },

    /**
     * @function observeAuthState
     * @description Observes changes in the authentication state of the user. 
     * When the authentication state changes, it updates the user in the store and sets loading to false.
     * @example
     * // Example usage in a React component:
     * useEffect(() => {
     *    observeAuthState();
     * }, [observeAuthState]);
     */
    observeAuthState: () => {
        onAuthStateChanged(auth, (user) => {
            set({ user, loading: false });
        });
    }
}));

export default useAuthStore;
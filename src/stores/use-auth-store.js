/**
 * @file useAuthStore.js
 * @description This file defines a Zustand store for managing authentication state within the web application. It provides methods for logging in with Google via a popup, logging out, registering a new user with email/password, and observing changes in the user's authentication state.
 * @date Created: 28/08/2024
 * @date Last Modified: 28/08/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 * @note Ensure that Firebase authentication settings and methods are properly configured to maintain secure user sessions.
 */

import { create } from "zustand";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase.config"; // Make sure Firebase is properly configured and initialized
import { setDoc, doc, serverTimestamp } from "firebase/firestore";

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({
    user: null, // Stores the current authenticated user
    loading: true, // Indicates whether the authentication state is being loaded

    setUser: (user) => set({ user }),

    /**
     * @function loginGoogleWithPopUp
     * @description Initiates a Google sign-in process using a popup window. 
     * If an error occurs during the sign-in, it logs the error to the console.
     * @async
     * @throws {FirebaseError} If an error occurs during the sign-in process.
     * @example
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
     * @function registerWithEmailAndPassword
     * @description Registers a new user with an email and password, and saves additional user information in Firestore.
     * @param {string} email - The user's email.
     * @param {string} password - The user's password.
     * @async
     * @throws {FirebaseError} If an error occurs during the registration process.
     * @example
     * const handleRegister = useCallback(() => {
     *    registerWithEmailAndPassword(email, password);
     * }, [registerWithEmailAndPassword]);
     */
    registerWithEmailAndPassword: async (email, password) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log('Usuario registrado:', user);

            // Save additional user info in Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                createdAt: serverTimestamp()
            });
            console.log('Información del usuario guardada en Firestore');
        } catch (error) {
            console.error(`Error al registrar el usuario: ${error.code} - ${error.message}`);
        }
    },

    /**
     * @function logout
     * @description Logs out the current user from the application.
     * If an error occurs during the sign-out process, it logs the error to the console.
     * @async
     * @throws {FirebaseError} If an error occurs during the sign-out process.
     * @example
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

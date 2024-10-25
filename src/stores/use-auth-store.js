/**
 * @file useAuthStore.js
 * @description This file defines a Zustand store for managing authentication state within the web application. It provides methods for logging in with Google via a popup, logging out, registering a new user with email/password, and observing changes in the user's authentication state.
 * @date Created: 28/08/2024
 * @date Last Modified: 24/10/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 * @note Ensure that Firebase authentication settings and methods are properly configured to maintain secure user sessions.
 */

import { create } from "zustand";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase.config"; // Ensure that Firebase is properly configured and initialized
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({
    loginResult: null, // Stores the result of the login
    user: null, // Stores the currently authenticated user
    loading: true, // Indicates if the authentication state is loading

    // Sets the current user in the store
    setUser: (user) => set({ user }),

    loginGoogleWithPopUp: async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            var user = result.user; // Get the user from the login result

            // Reference to the user document in Firestore
            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                // If the user does not exist, create a new document
                await setDoc(userDocRef, {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    uid: user.uid,
                });
                // Set the user in the state with the newly created information
                set({ user: { email: user.email, name: user.displayName, photoURL: user.photoURL, uid: user.uid } });
            } else {
                // If the user already exists, get the document information
                const userData = userDoc.data();
                user = { ...user, ...userData };
            }

        } catch (error) {
            console.log(`Error signing in with Google: ${error.message}`);
        }
    },

    /**
     * @function logout
     * @description Logs out the current user from the application.
     * If an error occurs during the sign-out process, it logs the error to the console.
     * @async
     * @throws {FirebaseError} If an error occurs during the sign-out process.
     */
    logout: async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
        } catch (error) {
            console.log(`Error signing out: ${error.message}`);
        }
    },

    /**
     * @function observeAuthState
     * @description Observes changes in the authentication state of the user. 
     * When the authentication state changes, it updates the user in the store and sets loading to false.
     */
    observeAuthState: () => {
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                // If there is a user, get their information
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    set({ user: userDoc.data(), loading: false });
                } else {
                    set({ user: null, loading: false }); // No document, so there is no valid user
                }
            } else {
                set({ user: null, loading: false }); // No authenticated user
            }
        });
    },
}));

export default useAuthStore;

import { create } from "zustand";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase.config';

const provider = new GoogleAuthProvider();

const useAuthStore = create((set) => ({
    loginResult: null,
    user: null,
    loading: true,

    setUser: (user) => set({ user }),
    setLoading: (status) => set({ loading: status }),

    loginGoogleWithPopUp: async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            let user = result.user;

            const userDocRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userDocRef);

            if (!userDoc.exists()) {
                await setDoc(userDocRef, {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    uid: user.uid,
                });
                set({ user: { email: user.email, displayName: user.displayName, photoURL: user.photoURL, uid: user.uid } });
            } else {
                const userData = userDoc.data();
                user = { ...user, ...userData };
                set({ user });
            }
        } catch (error) {
            console.log(`Error signing in with Google: ${error.message}`);
        }
    },

    logout: async () => {
        try {
            await signOut(auth);
            console.log("User signed out successfully");
        } catch (error) {
            console.log(`Error signing out: ${error.message}`);
        }
    },

    observeAuthState: () => {
        onAuthStateChanged(auth, async (user) => {
            set({ loading: true });
            if (user) {
                const userDocRef = doc(db, "users", user.uid);
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    console.log("User data from Firestore:", userData); // Debug
                    set({ user: userData, loading: false });
                } else {
                    console.warn("User authenticated but no document found in Firestore.");
                    set({ user: null, loading: false });
                }
            } else {
                set({ user: null, loading: false });
            }
        });
    },
}));

export default useAuthStore;

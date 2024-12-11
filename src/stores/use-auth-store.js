import { create } from "zustand";
import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../../firebase.config";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../../firebase.config";

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
                // Crear nuevo documento con puntuación inicial
                await setDoc(userDocRef, {
                    email: user.email,
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    uid: user.uid,
                    puntuacion: 0, // Inicialización
                });
                set({
                    user: {
                        email: user.email,
                        displayName: user.displayName,
                        photoURL: user.photoURL,
                        uid: user.uid,
                        puntuacion: 0,
                    },
                });
            } else {
                // Traer datos existentes del usuario, incluyendo puntuación
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
            set({ user: null });
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
                    set({ user: { ...userData, puntuacion: userData.puntuacion || 0 }, loading: false });
                } else {
                    console.warn("User authenticated but no document found in Firestore.");
                    set({ user: null, loading: false });
                }
            } else {
                set({ user: null, loading: false });
            }
        });
    },

    updatePuntuacion: async (delta, isAddition) => {
        const { user } = useAuthStore.getState(); // Obtener usuario actual
        if (user && user.uid) {
            try {
                const currentPuntuacion = user.puntuacion || 0; // Asegurarse de que haya una puntuación inicial
                const newPuntuacion = isAddition
                    ? currentPuntuacion + delta
                    : currentPuntuacion - delta;

                const userDocRef = doc(db, "users", user.uid);
                // Actualizar puntuación en Firestore
                await setDoc(userDocRef, { puntuacion: newPuntuacion }, { merge: true });

                // Actualizar estado en Zustand
                set((state) => ({
                    user: { ...state.user, puntuacion: newPuntuacion },
                }));
                console.log("Puntuación actualizada correctamente a:", newPuntuacion);
            } catch (error) {
                console.error("Error actualizando la puntuación:", error);
            }
        } else {
            console.error("No hay un usuario autenticado para actualizar la puntuación.");
        }
    },
}));

export default useAuthStore;

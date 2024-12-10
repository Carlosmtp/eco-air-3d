/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";
import useAuthStore from "../../stores/use-auth-store";
import "./TopTen.css";
import UserInfo from "../world/UserInfo";
import { Canvas } from "@react-three/fiber";
import Trophy from "./Trophy";
import { Html } from "@react-three/drei";

const TopTen = () => {
  const { user } = useAuthStore();
  const [topTen, setTopTen] = useState([]);
  const [userRank, setUserRank] = useState(null);

  useEffect(() => {
    const fetchTopTen = async () => {
      try {
        // Obtener las 10 mejores puntuaciones
        const topTenQuery = query(
          collection(db, "users"),
          orderBy("puntuacion", "desc"),
          limit(10)
        );
        const querySnapshot = await getDocs(topTenQuery);
        const topTenData = querySnapshot.docs.map((doc, index) => ({
          ...doc.data(),
          rank: index + 1,
        }));

        setTopTen(topTenData);

        // Calcular el puesto del usuario actual si está logueado
        if (user && user.uid) {
          const allUsersQuery = query(
            collection(db, "users"),
            orderBy("puntuacion", "desc")
          );
          const allUsersSnapshot = await getDocs(allUsersQuery);
          const allUsers = allUsersSnapshot.docs.map((doc) => doc.data());

          // Encontrar el puesto del usuario actual, incluso si no está en los primeros 10
          const currentUserRank =
            allUsers.findIndex((u) => u.uid === user.uid) + 1;

          // Solo mostrar el puesto si el usuario tiene una puntuación válida
          if (currentUserRank > 0) {
            setUserRank(currentUserRank);
          } else {
            setUserRank(null); // Si no tiene un puesto (por ejemplo, si no tiene puntuación)
          }
        }
      } catch (error) {
        console.error("Error fetching top ten scores:", error);
      }
    };

    fetchTopTen();
  }, [user]);

  return (
    <>
    <div className="top-ten-container">
    <UserInfo />
    <div className="top-ten-canvas">
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <directionalLight position={[-10, -10, -5]} intensity={2} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <Html position={[1, 2, 0]}>
        <div className="top-ten">
        <h2>Top 10 Puntuaciones</h2>
        <table className="top-ten-table">
          <thead>
            <tr>
              <th>Puesto</th>
              <th>Nombre</th>
              <th>Puntuación</th>
            </tr>
          </thead>
          <tbody>
            {topTen.map((entry) => (
              <tr
                key={entry.uid}
                className={
                  user && user.uid === entry.uid ? "highlight-row" : ""
                }
              >
                <td>{entry.rank}</td>
                <td>{entry.displayName || "Usuario Anónimo"}</td>
                <td>{entry.puntuacion}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {user && (
          <div className="current-user-rank">
            {userRank ? (
              <p>
                Estás en el puesto <strong>{userRank}</strong> con una
                puntuación de <strong>{user.puntuacion}</strong>.
              </p>
            ) : (
              <p>No estás en la lista de los 10 mejores.</p>
            )}
          </div>
        )}
      </div>
        </Html>
        <Trophy
        scale={[6, 6, 6]}
        position={[-3, 0, 0]}
        />
      </Canvas>
      </div>
    </div>
    </>
  );
};

export default TopTen;

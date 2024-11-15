/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import "./World.css";
import { useNavigate, useLocation } from "react-router-dom";
import useAuthStore from "../../stores/use-auth-store";
import { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import { Canvas } from "@react-three/fiber";
import Airplane from "./Airplane";
import { Float, Html, Line, Text } from "@react-three/drei";
import Clouds from "../login/Clouds";
import Spray from "./Spray";
import LittleCity from "../smog/LittleCity";
import Earth from "../login/Earth";

// Info card component
const Scene = ({ onClose, scrollPosition, handleScrollToPosition }) => {
  const navigate = useNavigate();

  const handleEnter = () => {
    onClose();
    setTimeout(() => {
      navigate("/World");
    }, 300);
  };

  // Crea múltiples nubes a lo largo del trayecto
  const cloudInstances = [];
  for (let i = -5; i < 10; i++) {
    cloudInstances.push(
      <Clouds
        key={i}
        position={[scrollPosition * 0.2 + i * 2, Math.sin(i) * 3, -4]}
        scale={[4, 4, 4]}
      />
    );
  }

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      ></link>
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <Html position={[-1.5, scrollPosition * 0.2, 0]}>
          <div className="info-card">
            <div className="scroll-container">
              <div className="mouse-scroll"></div>
              <div className="arrow"></div>
              <div className="scroll-text">Scroll</div>
            </div>
          </div>
        </Html>
        <mesh position={[-33, 1.5, 0]}>
          <Html position={[scrollPosition * 0.2 + 8, 0, 0]}>
            <div className="info-card">
              <h2>¡Conoce Sobre la Capa de Ozono!</h2>
              <p>
                ¡La capa de ozono necesita nuestra ayuda! Aprende cómo los
                productos como los aerosoles la dañan y cómo podemos protegerla.
              </p>
              <div
                className="icono-entrar"
                onClick={() => navigate("/ozone-layer")}
              >
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </Html>
          <Spray
            scale={[0.3, 0.3, 0.3]}
            position={[scrollPosition * 0.2 + 5.9, -1.9, 4]}
          />
        </mesh>

        <mesh position={[-38, 1.5, 0]}>
          <Html position={[scrollPosition * 0.2 + 8, 0, 0]}>
            <div className="info-card">
              <h2>¡Conoce Sobre el Efecto Invernadero!</h2>
              <p>
                Los gases de efecto invernadero están calentando la Tierra.
                Necesitamos actuar para reducir nuestras emisiones.
              </p>
              <div
                className="icono-entrar"
                onClick={() => navigate("/green-house")}
              >
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </Html>
          <Earth
            scale={[0.2, 0.2, 0.2]}
            position={[scrollPosition * 0.2 + 10, -1.9, 4]}
          />
        </mesh>
        <mesh position={[-43, 1.5, 0]}>
          <Html position={[scrollPosition * 0.2 + 8, 0, 0]}>
            <div className="info-card">
              <h2>¡Conoce Sobre el Smog!</h2>
              <p>
                El smog afecta nuestra salud, especialmente en ciudades con alta
                contaminación. Reducir las emisiones es clave.
              </p>
              <div className="icono-entrar" onClick={() => navigate("/smog")}>
                <i className="fas fa-arrow-right"></i>
              </div>
            </div>
          </Html>
          <LittleCity
            scale={[0.15, 0.15, 0.15]}
            position={[scrollPosition * 0.2 + 14, -1.88, 4]}
          />
        </mesh>
        {/* Renderiza todas las nubes creadas */}
        {cloudInstances}
        <mesh position={[scrollPosition * 0.02, 0, 4.5]}>
          <Clouds scale={[4, 4, 4]} />
          <Html position={[-1.3, 0, 0]}>
            <div className="cloud-text">
              <h1>¡Bienvenido al Eco Air 3D!</h1>
              <h2>
                Sumérgete en este mundo interactivo y descubre cómo los desafíos
                ambientales impactan el aire que respiramos. Aprende, explora y
                únete a la misión de un futuro más sostenible. 🌍
              </h2>
            </div>
          </Html>
        </mesh>
        <mesh position={[-scrollPosition * 0.2, 0, 0]}>
          <Float
            speed={7}
            factor={2}
            damping={7}
            mass={1}
            tension={1000}
            friction={10}
          >
            <mesh scale={[0.8, 0.8, 0.8]} position={[5, 0, 0]}>
              <mesh position={[6, 0.7, 0]}>
                <meshStandardMaterial color="#f0f0f0" />
                <planeGeometry args={[7.5, 1]} />
                <Text
                  position={[0, 0, 0.0001]}
                  fontSize={0.6}
                  anchorX="center"
                  anchorY="middle"
                  color="#000000"
                  castShadow
                >
                  Bienvenido al Mundo 3D
                </Text>
              </mesh>
              <Airplane position={[0, 0, 0]} rotation={[0, 1.2, 0]} />
              <Line
                points={[
                  [1.7, 0.35, 0],
                  [2.25, 0.5, 0],
                ]}
                color="gray"
                lineWidth={2}
              />
            </mesh>
          </Float>

          <ambientLight intensity={1.5} />
          <pointLight position={[10, 10, 10]} intensity={500} />
        </mesh>
        <Html position={[7, -3, 0]}>
          {scrollPosition > 10 && (
            <div
              className="icono-entrar"
              onClick={() => handleScrollToPosition(0)}
            >
              <i className="fas fa-arrow-right"></i>
            </div>
          )}
        </Html>
      </Canvas>
    </>
  );
};

// Welcome - Main component that renders the title and 3D placeholders.
const Welcome = () => {
  const { user } = useAuthStore(); // Tu autenticación
  const navigate = useNavigate();
  const location = useLocation(); // Acceder al estado de la navegación
  const [showScene, setShowScene] = useState(true);

  // Obtener scrollPosition desde el estado pasado por navigate
  const initialScrollPosition = location.state?.scrollPosition || 0; // Default a 0 si no se pasa
  const [scrollPosition, setScrollPosition] = useState(initialScrollPosition);

  // Función para manejar el scroll a una posición específica
  const handleScrollToPosition = (position) => {
    setScrollPosition(position);
    window.scrollTo(0, position);
  };

  useEffect(() => {
    if (scrollPosition !== undefined) {
      window.scrollTo(0, scrollPosition); // Establecer scroll inicial
    }
  }, [scrollPosition]);

  useEffect(() => {
    const handleScroll = (event) => {
      setScrollPosition((prevPosition) => {
        // Se asegura de que el scroll no pase de 140
        if (prevPosition >= 140) return 140;
        const newPosition = prevPosition + event.deltaY * 0.02;
        return Math.max(0, Math.min(newPosition, 140));
      });
    };

    window.addEventListener("wheel", handleScroll);

    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, []);

  if (!user) {
    navigate("/"); // Si no hay usuario, redirigir al login
    return null;
  }

  const handleCloseCard = () => {
    setShowScene(false);
  };

  return (
    <div className="world-container">
      <UserInfo />
      {showScene && (
        <Scene
          onClose={handleCloseCard}
          scrollPosition={scrollPosition}
          handleScrollToPosition={handleScrollToPosition} // Pasa la función al componente Scene
        />
      )}
    </div>
  );
};

export default Welcome;

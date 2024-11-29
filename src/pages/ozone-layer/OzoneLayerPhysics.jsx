import { Canvas } from "@react-three/fiber";
import { useNavigate } from "react-router-dom";
import { Box, Sphere } from "@react-three/drei";
import { Physics, RigidBody } from "@react-three/rapier";
import { useRef, useState, useEffect } from "react";
import { Color } from "three";
import { Html } from "@react-three/drei";
import UserInfo from "../world/UserInfo";
import City from "./City";
import Hand from "./Hand";

const OzoneLayerPhysics = () => {
  const navigate = useNavigate();
  const [rays, setRays] = useState([]);
  const [ozoneVisible, setOzoneVisible] = useState(true);
  const [showSolutions, setShowSolutions] = useState(false); // Estado para mostrar la tarjeta
  const layerRef = useRef();
  const [scrollPos, setScrollPos] = useState(0);

  const spawnRay = () => {
    setRays((prev) => [
      ...prev,
      {
        id: Date.now(),
        position: [Math.random() * 20 - 10, 10, 0],
        bounces: 0,
      },
    ]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      spawnRay();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleImpact = (id) => {
    if (layerRef.current) {
      const material = layerRef.current.material;
      material.color = new Color("red");
      setTimeout(() => {
        material.color = new Color("blue");
      }, 200);
    }

    setRays((prev) =>
      prev.map((ray) =>
        ray.id === id ? { ...ray, bounces: ray.bounces + 1 } : ray
      )
    );
  };

  const activeRays = rays.filter((ray) => ray.bounces < 2);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY / 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      ></link>

      <div className="ozone-layer-container">
        <UserInfo />
        <div className="ozone-simulation-canvas">
          <Canvas shadows camera={{ position: [0, 0, 15], fov: 70 }}>
            <ambientLight intensity={0.5} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
              castShadow
            />

            <Physics gravity={[0, -9.8, 0]} colliders="cuboid">
              <RigidBody type="fixed" colliders="trimesh">
                <City position={[-12, -7.5, 0]} scale={[2.1, 2.1, 2.1]} />
                <City position={[-0.1, -7.5, 0]} scale={[2.1, 2.1, 2.1]} />
                <City position={[13, -7.5, 0]} scale={[2.1, 2.1, 2.1]} />
              </RigidBody>

              {ozoneVisible && (
                <RigidBody type="fixed">
                  <Box
                    args={[1000, 0.5, 1]}
                    position={[scrollPos, 0, 0]}
                    ref={layerRef}
                  >
                    <meshStandardMaterial
                      color="blue"
                      transparent
                      opacity={0.3}
                    />
                  </Box>
                </RigidBody>
              )}

              {activeRays.map((ray) => (
                <RigidBody
                  key={ray.id}
                  position={ray.position}
                  restitution={[1]}
                  friction={0.1}
                  onCollisionEnter={() => handleImpact(ray.id)}
                  colliders="ball"
                  lockTranslations={[true, false, true]}
                >
                  <Sphere args={[0.2, 16, 16]}>
                    <meshStandardMaterial color="yellow" emissive="yellow" />
                  </Sphere>
                </RigidBody>
              ))}
            </Physics>

            <Html
              position={[-15, 5, 0]}
              transform
              distanceFactor={8}
              style={{
                width: "400px",
                height: "300px",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                padding: "20px",
                fontSize: "20px",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <div>
                <h2>Capa de Ozono</h2>
                <p>
                  La capa de ozono es representada por la barra azul
                  semitransparente. Su función es absorber los rayos
                  ultravioleta (UV) del sol, protegiendo la Tierra de los
                  efectos dañinos de la radiación solar.
                </p>
              </div>
            </Html>

            <Html
              position={[15, 5, 0]}
              transform
              distanceFactor={8}
              style={{
                width: "400px",
                height: "300px",
                borderRadius: "10px",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                padding: "20px",
                fontSize: "20px",
                backgroundColor: "white",
                color: "black",
              }}
            >
              <div>
                <h2>Radiación UV</h2>
                <p>
                  Los rayos UV, generados aleatoriamente, son las esferas
                  amarillas. Al impactar con la capa, la capa cambia
                  temporalmente de color, mostrando cómo absorbe la radiación.
                </p>
              </div>
            </Html>

            <Html position={[16, -6, 0]}>
              <button
                className="top-button"
                onClick={() => setShowSolutions(true)}
              >
                Soluciones ➡️
              </button>
            </Html>

            {/* Nueva tarjeta de soluciones dentro del Html */}
            {showSolutions && (
              <Html
              scale={[2.5, 2.5, 2.5]}
                position={[0, 0, 0]}
                transform
                distanceFactor={8}
                style={{
                  width: "300px",
                  height: "auto",
                  backgroundColor: "white",
                  padding: "15px",
                  borderRadius: "10px",
                  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
                  color: "black",
                  textAlign: "center",
                }}
              >
                <div>
                  <h3>Soluciones para la Capa de Ozono</h3>
                  <ul>
                    <li>Reducir el uso de CFCs.</li>
                    <li>Fomentar energías renovables.</li>
                    <li>Proteger y reforestar áreas verdes.</li>
                  </ul>
                  <button
                    onClick={() => setShowSolutions(false)}
                    style={{
                      marginTop: "10px",
                      padding: "5px 10px",
                      backgroundColor: "red",
                      color: "white",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                    }}
                  >
                    Cerrar
                  </button>
                </div>
              </Html>
            )}
          </Canvas>
        </div>

        <button
          className="ozone-toggle-button"
          onClick={() => setOzoneVisible((prev) => !prev)}
          style={{
            position: "relative",
            top: "20px",
            left: "20px",
            padding: "10px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {ozoneVisible ? "Quitar Capa de Ozono" : "Poner Capa de Ozono"}
        </button>
      </div>
    </>
  );
};

export default OzoneLayerPhysics;

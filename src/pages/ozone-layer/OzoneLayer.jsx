/* eslint-disable react/no-unknown-property */
import { Canvas } from "@react-three/fiber";
import {
  Line,
  Text3D,
  useTexture,
  Stars,
  Html,
  Float,
  Cloud,
} from "@react-three/drei";
import UserInfo from "../world/UserInfo";
import Earth from "../login/Earth";
import Clouds from "../login/Clouds";
import { useNavigate } from "react-router-dom";
import "./OzoneLayer.css";
import { useMemo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as THREE from "three";
import IntroCard from "./IntroCard";
import Hand from "./Hand";

// Componente RaysInfo
const RaysInfo = ({ uvType, onClose }) => {
  let content = "";

  // Contenido para cada tipo de UV
  switch (uvType) {
    case "UVB":
      content =
        "UVB (Ultravioleta B) es responsable de quemaduras solares y daño a la piel.";
      break;
    case "UVA":
      content =
        "UVA (Ultravioleta A) penetra más profundamente en la piel y es responsable de envejecimiento prematuro.";
      break;
    case "UVC":
      content =
        "UVC (Ultravioleta C) es la forma más peligrosa, pero afortunadamente es absorbida por la capa de ozono.";
      break;
    default:
      content = "Información no disponible.";
  }

  return (
    uvType && (
      <div
        style={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          fontSize: "14px",
          width: "300px",
          color: "black",
        }}
      >
        <h3>{uvType} - Información</h3>
        <p>{content}</p>
        <button
          onClick={onClose}
          style={{
            backgroundColor: "red",
            color: "white",
            padding: "5px 10px",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Cerrar
        </button>
      </div>
    )
  );
};

RaysInfo.propTypes = {
  uvType: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

const Scene = () => {
  const MATERIAL_PATH = useMemo(
    () => "materials/ozone-layer/fabric_pattern_05_",
    []
  );
  const [colorMap, normalMap, roughnessMap, aoMap] = useTexture([
    `${MATERIAL_PATH}col_01_1k.jpg`,
    `${MATERIAL_PATH}nor_gl_1k.jpg`,
    `${MATERIAL_PATH}rough_1k.jpg`,
    `${MATERIAL_PATH}ao_1k.jpg`,
  ]);
  const handleClick = (uvType) => {
    console.log("infoType actualizado a: ", uvType);
    setInfoType(uvType);
  };

  const repeatCount = 15;
  colorMap.wrapS =
    normalMap.wrapS =
    roughnessMap.wrapS =
    aoMap.wrapS =
      THREE.RepeatWrapping;
  colorMap.wrapT =
    normalMap.wrapT =
    roughnessMap.wrapT =
    aoMap.wrapT =
      THREE.RepeatWrapping;
  colorMap.repeat.set(repeatCount, repeatCount);
  normalMap.repeat.set(repeatCount, repeatCount);
  roughnessMap.repeat.set(repeatCount, repeatCount);
  aoMap.repeat.set(repeatCount, repeatCount);

  // Estado del mouse y del teclado
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0.5);
  const [rotate, setRotate] = useState(false); // Control de rotación
  const [infoType, setInfoType] = useState(null);

  // Actualizar posición del mouse y opacidad
  useEffect(() => {
    const handleMouseMove = (event) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1;
      const y = -(event.clientY / window.innerHeight) * 2 + 1;
      setMouse({ x, y });

      const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
      setOpacity(Math.max(0.2, 1 - distance / 1.5));
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Función para manejar la interactividad del teclado
  const handleKeyDown = (event) => {
    if (event.key === "r" || event.key === "R") {
      setRotate((prevState) => !prevState); // Alterna la rotación al presionar 'r'
    }
    if (event.key === "ArrowUp") {
      setOpacity((prevOpacity) => Math.min(1, prevOpacity + 0.1)); // Aumenta la opacidad
    }
    if (event.key === "ArrowDown") {
      setOpacity((prevOpacity) => Math.max(0.1, prevOpacity - 0.1)); // Disminuye la opacidad
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade={true}
        speed={3}
      />
      <Cloud
        seed={1}
        scale={1}
        position={[-2, 0, 5]}
        volume={5}
        fade={100}
        speed={0.3}
        rotationSpeed={0.1}
        growth={0.5}
        castShadow
        receiveShadow
      />
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 0, 5]}
        intensity={5}
        color="white"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={500}
        shadow-camera-near={1}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Nubes con movimiento suave */}
      <Clouds
        position={[-3.5 + mouse.x * 0.2, 0 + mouse.y * 0.2, 4]} // Aplica desplazamiento suave
        scale={[5, 5, 5]}
        castShadow
        receiveShadow
      />

      <Earth
        position={[-5, 0, 0]}
        scale={[3.5, 3.5, 3.5]}
        castShadow
        receiveShadow
      />

      {/* Texto con animación flotante */}
      <Float size={0.5} position={[5, 3, 3]} factor={0.1} speed={1}>
        <Text3D
          position={[1.8, 2, -4]}
          font="/fonts/clouts.json"
          height={0.5}
          curveSegments={32}
          bevelEnabled
          bevelSize={0.02}
          bevelThickness={0.03}
          letterSpacing={-0.05}
        >
          La Capa de Ozono
          <meshStandardMaterial
            attach="material"
            color="blue"
            metalness={0.2}
            roughness={0.5}
          />
          <meshStandardMaterial
            attach="material-side"
            color="#000000"
            metalness={0.1}
            roughness={0.8}
          />
        </Text3D>
      </Float>

      {/* Esfera que representa la capa de ozono */}
      <mesh
        castShadow
        position={[-5, 0, 0]}
        rotation={rotate ? [0, 0.01, 0] : [0, 0, 0]}
      >
        <sphereGeometry args={[4, 200, 200]} />
        <meshStandardMaterial
          map={colorMap}
          normalMap={normalMap}
          roughnessMap={roughnessMap}
          aoMap={aoMap}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Líneas que representan la luz solar */}
      <Line
        points={[
          [5, 5, 5],
          [-5, 2, -0.5],
        ]}
        color="yellow"
        lineWidth={2}
      />
      <Line
        points={[
          [5, 5, 5],
          [-5, 1, 0.5],
        ]}
        color="yellow"
        lineWidth={2}
      />
      <Line
        points={[
          [5, 5, 5],
          [-5.2, -1, -0.7],
        ]}
        color="yellow"
        lineWidth={2}
      />
      <Line
        points={[
          [5, 5, 5],
          [-4.8, -0.3, 0.7],
        ]}
        color="yellow"
        lineWidth={2}
      />
      <Line
        points={[
          [5, 5, 5],
          [-5.1, 0, 0.8],
        ]}
        color="yellow"
        lineWidth={2}
      />

      {/* Textos indicativos con funcionalidad de clic */}
      <Text3D
        scale={[0.3, 0.3, 0.3]}
        position={[1.5, 2.8, 5]}
        font="/fonts/roboto_bold_italic.json"
        height={0.5}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.03}
        letterSpacing={-0.05}
        onClick={() => handleClick("UVB")}
        onPointerOver={(e) => {
          document.body.style.cursor = "pointer";
          e.object.material.color.set("orange");
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = "default";
          e.object.material.color.set("blue");
        }}
      >
        UVB
        <meshStandardMaterial
          attach="material"
          color="blue"
          metalness={0.2}
          roughness={0.5}
        />
      </Text3D>
      <Text3D
        scale={[0.3, 0.3, 0.3]}
        position={[-0.8, 1.3, 5]}
        fontSize={0.5}
        font="/fonts/roboto_bold_italic.json"
        height={0.5}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.03}
        letterSpacing={-0.05}
        onClick={() => handleClick("UVC")}
        onPointerOver={(e) => {
          document.body.style.cursor = "pointer";
          e.object.material.color.set("orange");
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = "default";
          e.object.material.color.set("blue");
        }}
      >
        UVC
        <meshStandardMaterial
          attach="material"
          color="blue"
          metalness={0.2}
          roughness={0.5}
        />
      </Text3D>
      <Text3D
        scale={[0.3, 0.3, 0.3]}
        position={[0.2, 2, 5]}
        font="/fonts/roboto_bold_italic.json"
        height={0.5}
        curveSegments={32}
        bevelEnabled
        bevelSize={0.02}
        bevelThickness={0.03}
        letterSpacing={-0.05}
        onClick={() => handleClick("UVA")}
        onPointerOver={(e) => {
          document.body.style.cursor = "pointer";
          e.object.material.color.set("orange");
        }}
        onPointerOut={(e) => {
          document.body.style.cursor = "default";
          e.object.material.color.set("blue");
        }}
      >
        UVA
        <meshStandardMaterial
          attach="material"
          color="blue"
          metalness={0.2}
          roughness={0.5}
        />
      </Text3D>

      {/* Panel HTML explicativo */}
      <Html
        position={[7, -1, 0]}
        transform
        distanceFactor={8}
        style={{
          width: "400px",
          height: "400px",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          fontSize: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IntroCard />
      </Html>
      <Html position={[-7, -1, 0]}>
        <RaysInfo uvType={infoType} onClose={() => setInfoType(null)} />
      </Html>
    </>
  );
};

const OzoneLayer = () => {
  const navigate = useNavigate();
  return (
    <>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
      ></link>
      <div className="ozone-layer-container">
        <UserInfo />
        <div className="ozone-canvas">
          <Canvas shadows camera={{ position: [0, 0, 10], fov: 70 }}>
            <Scene />
            <Html position={[-1, -4, 0]}>
              <button
                className="top-button"
                onClick={() => navigate("/ozone-layer-physics")}
              >
                Ver Simulación ➡️
              </button>
            </Html>
            <Html position={[-13, -3.4, 0]}>
              <div
                className="icono-entrar"
                onClick={() => navigate("/welcome", { state: { scrollPosition: 140 } })}
              >
                <i className="fas fa-arrow-left"></i>
              </div>
            </Html>
          </Canvas>
        </div>
      </div>
    </>
  );
};

export default OzoneLayer;

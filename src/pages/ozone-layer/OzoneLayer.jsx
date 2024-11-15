/* eslint-disable react/no-unknown-property */
/**
 * @file OzoneLayer.jsx
 * @description This component renders a 3D scene of the Ozone Layer, including a representation of the Earth, ambient light, directional light, visual indicators for UV radiation, and an introductory card with information about the Ozone Layer.
 * @date Created: 31/10/2024
 * @date Last Modified: 14/11/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 */
import { Canvas } from "@react-three/fiber";
import {
  Line,
  Text,
  useTexture,
  Stars,
  Html,
  Float,
  Cloud,
} from "@react-three/drei";
import UserInfo from "../world/UserInfo";
import Earth from "../login/Earth";
import Clouds from "../login/Clouds";
import "./OzoneLayer.css";
import { useMemo, useState, useEffect } from "react";
import * as THREE from "three";

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

  // Estado del mouse
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0.5);

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

  // Función para manejar clics en textos de UV
  const handleClick = (uvType) => {
    switch (uvType) {
      case "UVB":
        setOpacity(0.5);
        break;
      case "UVA":
        window.open("/uva.html", "_blank");
        break;
      case "UVC":
        window.open("/uvc.html", "_blank");
        break;
      default:
        break;
    }
  };

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
      <Float size={0.5} position={[5, 3, 2]} factor={7} speed={7}>
        <Text
          color="white"
          fontSize={0.5}
          maxWidth={200}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.05}
          outlineColor="blue"
          
        >
          La Capa de Ozono
        </Text>
      </Float>

      {/* Esfera que representa la capa de ozono */}
      <mesh castShadow position={[-5, 0, 0]}>
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
      <Html
        position={[1.6, 5.4, 0]}
        center
        onClick={() => handleClick("UVB")}
        style={{ cursor: "pointer" }}
      >
        <div className="intro-card" style={{ color: "blue", fontSize: "16px" }}>
          UVB
        </div>
      </Html>
      <Html
        position={[-1.5, 3.5, 0]}
        center
        onClick={() => handleClick("UVC")}
        style={{ cursor: "pointer" }}
      >
        <div className="intro-card" style={{ color: "blue", fontSize: "16px" }}>
          UVC
        </div>
      </Html>
      <Html
        position={[0.5, 4, 0]}
        center
        onClick={() => handleClick("UVA")}
        style={{ cursor: "pointer" }}
      >
        <div className="intro-card" style={{ color: "blue", fontSize: "16px" }}>UVA</div>
      </Html>

      {/* Panel HTML explicativo */}
      <Html
        position={[6, 0, 0]}
        transform
        distanceFactor={8}
        style={{
          width: "400px",
          height: "200px",
          background: "rgba(255, 255, 255, 0.8)",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.2)",
          padding: "20px",
          fontSize: "16px",
          color: "#333",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>
          La capa de ozono es esencial para la vida en la Tierra. Actúa como un
          escudo que protege a nuestro planeta de la dañina radiación UV del
          sol. Proteger nuestra capa de ozono es vital para prevenir efectos
          adversos en la salud humana y el medio ambiente, como el aumento de
          casos de cáncer de piel y daños a los ecosistemas.
        </p>
      </Html>
    </>
  );
};

const OzoneLayer = () => {
  return (
    <div className="ozone-layer-container">
      <UserInfo />
      <div className="ozone-canvas">
        <Canvas shadows camera={{ position: [0, 0, 10], fov: 70 }}>
          <Scene />
        </Canvas>
      </div>
    </div>
  );
};

export default OzoneLayer;

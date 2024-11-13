import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import UserInfo from "../world/UserInfo";
import EarthModel from './EarthModel';
import OzoneLayer from './OzoneLayer';
import Moon from './Moon';
import './GreenHouse.css';
import Cubemap from './Cubemap';
import ZoomButton from './ZoomButton';
import InfoButton from './InfoButton';
import Stars from './Stars';

const GreenHouse = () => {
  const [zoomedIn, setZoomedIn] = useState(false); // Inicia con zoom hecho
  const [showText, setShowText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cameraRef = useRef();
  const groupRef = useRef(); // Referencia para el grupo de toda la escena
  const [groupPosition, setGroupPosition] = useState([0, 0, 0]); // Posición del grupo

  /**
   * Alternar el estado de zoom y mostrar el texto al alejar.
   */
  const toggleZoom = () => {
    if (zoomedIn) {
      setShowText(true); // Mostrar al alejar
    } else {
      setShowText(false); // Ocultar al acercar
    }
    setZoomedIn(!zoomedIn);
  };

  // Ajustar la posición y la escala de la escena al hacer zoom
  useEffect(() => {
    if (cameraRef.current && groupRef.current) {
      if (zoomedIn) {
        groupRef.current.position.set(-0.7, -0.3, 0);
        groupRef.current.scale.set(1.5, 1.5, 1.5);
        cameraRef.current.fov = 30;
      } else {
        groupRef.current.position.set(-2, -0.5, 0); // Desplazar escena a la izquierda
        groupRef.current.scale.set(1, 1, 1); // Escala normal
        cameraRef.current.position.set(2, 1, 4); // Mover cámara a la derecha
        cameraRef.current.fov = 45;
      }
      cameraRef.current.updateProjectionMatrix();
    }
  }, [zoomedIn]);

  // Detectar eventos de teclado (flechas)
  const handleKeyDown = (event) => {
    let [x, y, z] = groupPosition;

    // Movimientos del grupo usando las flechas
    if (event.key === 'ArrowUp') {
      z -= 0.1; // Mover todo hacia adelante
    }
    if (event.key === 'ArrowDown') {
      z += 0.1; // Mover todo hacia atrás
    }
    if (event.key === 'ArrowLeft') {
      x -= 0.1; // Mover todo hacia la izquierda
    }
    if (event.key === 'ArrowRight') {
      x += 0.1; // Mover todo hacia la derecha
    }

    setGroupPosition([x, y, z]);
  };

  // Añadir y limpiar el eventListener para las teclas
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [groupPosition]);

  const cubemapImages = [
    '/cubemapSpace/right.png',
    '/cubemapSpace/left.png',
    '/cubemapSpace/top.png',
    '/cubemapSpace/bottom.png',
    '/cubemapSpace/front.png',
    '/cubemapSpace/back.png',
  ];

  return (
    <div className="greenhouse-container">
      <UserInfo />
      <Canvas shadows camera={{ position: [0, 1, 2], fov: 45 }} onCreated={({ camera }) => (cameraRef.current = camera)}>
        <Suspense fallback={null}>
          <Stars />
          <group ref={groupRef} position={groupPosition}>
            <Cubemap images={cubemapImages} />
            <ambientLight intensity={0.1} />
            <directionalLight
              position={[5, 0, 5]}
              intensity={1.5}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
              shadow-camera-far={50}
              shadow-camera-left={-10}
              shadow-camera-right={10}
              shadow-camera-top={10}
              shadow-camera-bottom={-10}
            />
            <pointLight position={[-10, 10, -10]} intensity={0.5} />

            <EarthModel />
            <OzoneLayer />
            <Moon />

            {/* Mostrar el texto al estilo Star Wars una sola vez */}
            {showText && (
              <Html position={[2, 0, -5]} distanceFactor={8} transform>
                <div className="scrolling-text" onAnimationEnd={() => setShowText(false)}>
                  <p>
                    El efecto invernadero es una trampa de calor que está alterando nuestro planeta.
                    Debemos tomar medidas ahora para proteger el futuro.
                  </p>
                </div>
              </Html>
            )}
          </group>
        </Suspense>

        <OrbitControls />
      </Canvas>

      {/* Botones de Zoom e Información */}
      <ZoomButton zoomedIn={zoomedIn} toggleZoom={toggleZoom} />
      <InfoButton toggleModal={() => setShowModal(!showModal)} />

      {/* Modal de Información */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Comprendiendo el Efecto Invernadero</h2>
            <p>
              El efecto invernadero es fundamental para mantener la temperatura de nuestro planeta.
              Sin embargo, las actividades humanas han intensificado este proceso, atrapando más calor en la atmósfera y contribuyendo al cambio climático.
            </p>
            <button className="close-button" onClick={() => setShowModal(false)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenHouse;

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import UserInfo from "../world/UserInfo";
import EarthModel from './EarthModel';
import OzoneLayer from './OzoneLayer';
import Moon from './Moon';
import './GreenHouse.css';
import Cubemap from './Cubemap';

const GreenHouse = () => {
  const [zoomedIn, setZoomedIn] = useState(false); // Estado para manejar el zoom
  const [showModal, setShowModal] = useState(false); // Estado para manejar el modal
  const cameraRef = useRef(); // Referencia a la cámara

  const toggleZoom = () => {
    setZoomedIn((prev) => !prev);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (cameraRef.current) {
      if (zoomedIn) {
        cameraRef.current.position.set(0, 1, 4); // acercar
      } else {
        cameraRef.current.position.set(0, 1, 2); // alejar
      }
    }
  }, [zoomedIn]);

  const cubemapImages = [
    '/cubemapSpace/right.png',  // posx
    '/cubemapSpace/left.png',   // negx
    '/cubemapSpace/top.png',    // posy
    '/cubemapSpace/bottom.png', // negy
    '/cubemapSpace/front.png',  // posz
    '/cubemapSpace/back.png',   // negz
  ];

  return (
    <div className="greenhouse-container">
      <UserInfo />
      <Canvas
        shadows
        camera={{ position: [0, 1, 2], fov: 45 }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <Suspense fallback={null}>
          {/* Optional: <Environment files="/textures/space.hdr" background /> */}

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
        </Suspense>

        <OrbitControls />
      </Canvas>

      {/* Botón de acercar/alejar */}
      <button
        onClick={toggleZoom}
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        {zoomedIn ? 'Alejar' : 'Acercar'}
      </button>

      {/* Botón de Más Información */}
      <button
        onClick={toggleModal}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
      >
        Más Información
      </button>

      {/* Modal de Información */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: '1000',
          }}
          onClick={toggleModal} // Cierra el modal al hacer clic fuera del contenido
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '8px',
              width: '80%',
              maxWidth: '500px',
              textAlign: 'center',
              position: 'relative',
              color: '#333',
            }}
            onClick={(e) => e.stopPropagation()} // Evita cerrar el modal al hacer clic dentro del contenido
          >
            <h2>Efecto Invernadero</h2>
            <p>El efecto invernadero es fundamental para mantener la temperatura de nuestro planeta.
              Sin embargo, las actividades humanas han intensificado este proceso, atrapando más calor en la
              atmósfera y contribuyendo al cambio climático. Este fenómeno provoca un aumento de las temperaturas,
              alteraciones en los ecosistemas y fenómenos meteorológicos extremos, afectando a todas las
              formas de vida en la Tierra.</p>
            <button
              onClick={toggleModal}
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                backgroundColor: 'transparent',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenHouse;

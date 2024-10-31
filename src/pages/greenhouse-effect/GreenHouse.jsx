import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import UserInfo from "../world/UserInfo";
import EarthModel from './EarthModel';
import OzoneLayer from './OzoneLayer';
import Moon from './Moon';
import './GreenHouse.css';
import Cubemap from './Cubemap';
import ZoomButton from './ZoomButton';
import InfoButton from './InfoButton';

const GreenHouse = () => {
  const [zoomedIn, setZoomedIn] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cameraRef = useRef();

  const toggleZoom = () => {
    setZoomedIn((prev) => !prev);
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 1, zoomedIn ? 4 : 2);
    }
  }, [zoomedIn]);

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
      <Canvas
        shadows
        camera={{ position: [0, 1, 2], fov: 45 }}
        onCreated={({ camera }) => (cameraRef.current = camera)}
      >
        <Suspense fallback={null}>
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

      <ZoomButton zoomedIn={zoomedIn} toggleZoom={toggleZoom} />
      <InfoButton toggleModal={toggleModal} />

      {showModal && (
        <div className="modal-overlay" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2>Comprendiendo el Efecto Invernadero</h2>
            <p>
              El efecto invernadero es fundamental para mantener la temperatura de nuestro planeta.
              Sin embargo, las actividades humanas han intensificado este proceso, atrapando más calor en la
              atmósfera y contribuyendo al cambio climático. Este fenómeno provoca un aumento de las temperaturas,
              alteraciones en los ecosistemas y fenómenos meteorológicos extremos, afectando a todas las
              formas de vida en la Tierra.
            </p>
            <button className="close-button" onClick={toggleModal}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenHouse;

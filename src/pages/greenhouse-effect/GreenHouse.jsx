/**
 * @file GreenHouse.jsx
* GreenHouse component renders an interactive 3D scene that simulates the Greenhouse Effect.
* It includes Earth, an ozone layer, the Moon, and a cubemap background, with controls for zooming and info modal.
* @returns {JSX.Element} A fully interactive 3D greenhouse simulation.
* @date Created: 27/10/2024
 * @updated: 31/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import UserInfo from "../world/UserInfo";
import EarthModel from './EarthModel';
import OzoneLayer from './OzoneLayer';
import Moon from './Moon';
import './GreenHouse.css';
import Cubemap from './Cubemap';
import ZoomButton3D from './ZoomButton3D';
import InfoButton3D from './InfoButton3D';
import Stars from './Stars';
import BouncingRays from './BouncingRays';
import * as THREE from 'three';

const GreenHouse = () => {
  const [zoomedIn, setZoomedIn] = useState(false); // Inicia con zoom hecho
  const [showText, setShowText] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const cameraRef = useRef();
  const groupRef = useRef();
  const [groupPosition, setGroupPosition] = useState([0, 0, 0]); // Posición del grupo
  const [buttonPosition, setButtonPosition] = useState([0, 0.7, 0]);
  const onImpactRef = useRef();
  const sunPosition = new THREE.Vector3(5, 0, 5); // Posición del Sol

  // Función para alternar zoom
  const toggleZoom = () => {
    if (zoomedIn) {
      setShowText(true);
      setButtonPosition([0, 0.7, 0]); // Volver a la posición original al alejar
    } else {
      setShowText(false);
      setButtonPosition([0.9, 0, 0]); // Nueva posición al acercar
    }
    setZoomedIn(!zoomedIn);
  };

  // Ajustar la posición y escala al hacer zoom
  useEffect(() => {
    if (cameraRef.current && groupRef.current) {
      if (zoomedIn) {
        groupRef.current.position.set(-0.7, -0.3, 0);
        groupRef.current.scale.set(1.5, 1.5, 1.5);
        cameraRef.current.fov = 30;
      } else {
        groupRef.current.position.set(-2, -0.5, 0);
        groupRef.current.scale.set(1, 1, 1);
        cameraRef.current.position.set(2, 1, 4);
        cameraRef.current.fov = 45;
      }
      cameraRef.current.updateProjectionMatrix();
    }
  }, [zoomedIn]);

  // Eventos de teclado para mover la escena
  const handleKeyDown = (event) => {
    let [x, y, z] = groupPosition;

    if (event.key === 'ArrowUp') {
      z -= 0.1; // Mover hacia adelante
    }
    if (event.key === 'ArrowDown') {
      z += 0.1; // Mover hacia atrás
    }
    if (event.key === 'ArrowLeft') {
      x -= 0.1; // Mover hacia la izquierda
    }
    if (event.key === 'ArrowRight') {
      x += 0.1; // Mover hacia la derecha
    }

    setGroupPosition([x, y, z]);
  };

  // Añadir y limpiar el listener para las teclas
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
      <Canvas shadows camera={{ position: [0, 0, 2], fov: 50 }} onCreated={({ camera }) => (cameraRef.current = camera)}>
        <Suspense fallback={null}>
          <Stars />
          <group ref={groupRef} position={groupPosition}>
            <Cubemap images={cubemapImages} />
            <ambientLight intensity={0.1} />
            <directionalLight position={sunPosition.toArray()} intensity={1.5} castShadow />
            <pointLight position={[-10, 10, -10]} intensity={0.5} />
            <EarthModel onImpact={(fn) => (onImpactRef.current = fn)} />
            <OzoneLayer />
            <Moon />
            <BouncingRays onImpact={(worldPosition) => onImpactRef.current && onImpactRef.current(worldPosition)}
            sunPosition={sunPosition}
            />

            {showText && (
              <Html position={[2, 0, -5]} distanceFactor={8} transform>
                <div className="scrolling-text">
                  <p>
                    El efecto invernadero, aunque esencial para la vida en la Tierra, está siendo intensificado por actividades humanas. Esto está causando un desequilibrio en el clima global.
                    Es urgente actuar para mitigar sus impactos y preservar nuestro futuro.
                  </p>
                </div>
              </Html>
            )}

            <ZoomButton3D
              zoomedIn={zoomedIn}
              toggleZoom={toggleZoom}
              buttonPosition={buttonPosition}
            />


            <InfoButton3D
              modelUrl="/models/greenhouse/infoModel.glb"
              onClick={() => setShowModal(true)}
              description="Más Información"
            />
          </group>
        </Suspense>
        <OrbitControls />
      </Canvas>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content">
            <h2>Impacto del Efecto Invernadero en el Cambio Climático</h2>
              <p>
                El efecto invernadero es un proceso natural que mantiene la temperatura de la Tierra en un rango habitable. Sin embargo, las actividades humanas, como la quema de combustibles fósiles y la deforestación, están aumentando la concentración de gases de efecto invernadero como el dióxido de carbono.
                Este cambio está alterando el equilibrio climático, generando fenómenos extremos como olas de calor, tormentas más intensas y el derretimiento de los polos. Si no tomamos medidas ahora, las generaciones futuras enfrentarán un planeta mucho más cálido e inhabitable.
              </p>

            <button onClick={() => setShowModal(false)}>&times;</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GreenHouse;

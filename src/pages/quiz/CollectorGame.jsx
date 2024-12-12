/**
 * @file CollectorGame.jsx
 * @description This component is the one in charge of the entire minigame in general of the quiz tab.
 * @date Created: 03/12/2024
 * @updated: 11/12/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import useAuthStore from "../../stores/use-auth-store";
import PlayerModel from './PlayerModel';
import { useNavigate } from 'react-router-dom';

const INITIAL_TIME = 30;
const GOOD_ITEM_TIME_BONUS = 2;
const BAD_ITEM_TIME_PENALTY = 2;
const AREA_SIZE = 5;
const PLAYER_SPEED = 0.1;
const ITEM_SIZE = 0.1;
const PLAYER_SIZE = 0.2;

const ITEM_COUNT_HARMFUL = 3;
const ITEM_COUNT_GOOD = 3;
const ITEM_COUNT_NEUTRAL = 3;
const ITEM_COUNT_TEMPORAL = 1;
const ITEM_COUNT_TRAP = 1;

const TEMPORAL_EFFECT_DURATION = 10;
const TRAP_EFFECT_DURATION = 10;
const ENVIRONMENT_MAX = 100;

function checkCollision(posA, posB, radiusA, radiusB) {
  const dx = posA[0] - posB[0];
  const dy = posA[1] - posB[1];
  const dz = posA[2] - posB[2];
  const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
  return dist < (radiusA + radiusB);
}

function randomPosition(range = 4) {
  return [
    (Math.random() - 0.5) * range,
    0.1,
    (Math.random() - 0.5) * range
  ];
}

function randomVelocity(maxSpeed = 0.02) {
  return [
    (Math.random() - 0.5) * maxSpeed,
    0,
    (Math.random() - 0.5) * maxSpeed
  ];
}

function Collectable({ item, playerPos, playerSize, onCollected, gameOver }) {
  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(...item.position);
    }
  }, [item.position]);

  useFrame(() => {
    if (gameOver) return;
    const pos = ref.current.position;
    pos.x += item.velocity[0];
    pos.z += item.velocity[2];

    if (Math.abs(pos.x) > AREA_SIZE || Math.abs(pos.z) > AREA_SIZE) {
      onCollected(item, true);
      return;
    }

    const itemPos = [pos.x, pos.y, pos.z];
    if (checkCollision(playerPos, itemPos, playerSize, item.size)) {
      onCollected(item, false);
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[item.size, 16, 16]} />
      <meshStandardMaterial color={item.color} />
    </mesh>
  );
}

function Player({ position, size }) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.position.set(...position);
    }
  }, [position]);
  return (
    <mesh ref={ref} castShadow receiveShadow>
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color="blue" />
    </mesh>
  );
}

function PulseObject({ onPulse }) {
  const ref = useRef();
  const waveRef = useRef();
  const pulseFrequency = 3;
  const [pulseTime, setPulseTime] = useState(0);

  useFrame((state, delta) => {
    setPulseTime(prev => prev + delta);
    if (pulseTime >= pulseFrequency) {
      setPulseTime(0);
      onPulse();
      if (waveRef.current) {
        waveRef.current.scale.set(0.1, 1, 0.1);
        waveRef.current.material.opacity = 1;
      }
    }
    if (waveRef.current) {
      waveRef.current.scale.x += delta * 2;
      waveRef.current.scale.z += delta * 2;
      waveRef.current.material.opacity -= delta * 0.4;
      if (waveRef.current.material.opacity < 0) waveRef.current.material.opacity = 0;
    }
  });

  return (
    <group>
      <mesh ref={ref} position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="purple" emissive="purple" emissiveIntensity={0.5}/>
      </mesh>
      <mesh ref={waveRef} rotation={[-Math.PI/2,0,0]} position={[0,0.11,0]}>
        <circleGeometry args={[0.2, 32]} />
        <meshBasicMaterial color="purple" transparent opacity={0.8}/>
      </mesh>
    </group>
  );
}

const CollectorGame = () => {
  const navigate = useNavigate();
  const { user, updatePuntuacion } = useAuthStore();
  const [playerPos, setPlayerPos] = useState([0, 0.15, 0]);
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const [gameOver, setGameOver] = useState(false);
  const [message, setMessage] = useState("");
  const [environmentState, setEnvironmentState] = useState(0);

  const [doublePointsActive, setDoublePointsActive] = useState(false);
  const [invertedControls, setInvertedControls] = useState(false);

  // Control de inicio del juego
  const [showIntroModal, setShowIntroModal] = useState(true);
  const [itemsInitialized, setItemsInitialized] = useState(false);

  // Arreglos de ítems
  const [harmfulItems, setHarmfulItems] = useState([]);
  const [goodItems, setGoodItems] = useState([]);
  const [neutralItems, setNeutralItems] = useState([]);
  const [temporalItems, setTemporalItems] = useState([]);
  const [trapItems, setTrapItems] = useState([]);

  // Generar ítems cuando el juego empieza
  const initializeItems = useCallback(() => {
    const generateItems = (count, color, type) => {
      return Array.from({ length: count }, () => ({
        id: Math.random().toString(36).substring(7),
        position: randomPosition(4),
        size: ITEM_SIZE,
        color,
        type,
        velocity: randomVelocity()
      }));
    };

    setHarmfulItems(generateItems(ITEM_COUNT_HARMFUL, 'black', 'harmful'));
    setGoodItems(generateItems(ITEM_COUNT_GOOD, 'green', 'good'));
    setNeutralItems(generateItems(ITEM_COUNT_NEUTRAL, 'gray', 'neutral'));
    setTemporalItems(generateItems(ITEM_COUNT_TEMPORAL, 'blue', 'temporal'));
    setTrapItems(generateItems(ITEM_COUNT_TRAP, 'red', 'trap'));
    setItemsInitialized(true);
  }, []);

  const endGame = useCallback((msg) => {
    setGameOver(true);
    setMessage(msg);
  }, []);

  useEffect(() => {
    // Mover con flechas únicamente
    const handleKeyDown = (e) => {
      if (gameOver || showIntroModal) return;
      setPlayerPos(prev => {
        let [x, y, z] = prev;
        let speed = PLAYER_SPEED;

        // Solo flechas, no WASD
        if (invertedControls) {
          // Controles invertidos
          if (e.key === 'ArrowUp') z += speed;
          if (e.key === 'ArrowDown') z -= speed;
          if (e.key === 'ArrowLeft') x += speed;
          if (e.key === 'ArrowRight') x -= speed;
        } else {
          // Controles normales
          if (e.key === 'ArrowUp') z -= speed;
          if (e.key === 'ArrowDown') z += speed;
          if (e.key === 'ArrowLeft') x -= speed;
          if (e.key === 'ArrowRight') x += speed;
        }

        if (Math.abs(x) > AREA_SIZE || Math.abs(z) > AREA_SIZE) {
          endGame("¡Has salido del área! Has perdido.");
          return prev;
        }
        return [x, y, z];
      });
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameOver, invertedControls, showIntroModal, endGame]);

  // Timer, solo corre cuando no hay modal y no hay game over
  useEffect(() => {
    if (gameOver || showIntroModal) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        const newTime = prev - 1;
        if (newTime <= 0) {
          clearInterval(interval);
          endGame("¡El tiempo se ha agotado! Examen finalizado.");

          // Redirigir a la página de resultados
          navigate("/top-ten");
        }
        return newTime;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver, showIntroModal, endGame]);

  // Recolectar ítems
  const handleCollected = useCallback((item, disappeared) => {
    if (gameOver) return;

    if (disappeared) {
      removeItem(item);
      return;
    }

    switch (item.type) {
      case 'good':
        {
          let points = 1;
          if (doublePointsActive) points *= 2;
          if (user) updatePuntuacion(points, true);
          setTimeLeft(prev => prev + GOOD_ITEM_TIME_BONUS);
          setEnvironmentState(prev => Math.min(prev + 10, ENVIRONMENT_MAX));
        }
        break;
      case 'harmful':
        {
          let points = 1;
          if (doublePointsActive) points *= 2;
          if (user && user.puntuacion > 0) updatePuntuacion(points, false);
          setTimeLeft(prev => Math.max(prev - BAD_ITEM_TIME_PENALTY, 0));
        }
        break;
      case 'neutral':
        break;
      case 'temporal':
        setDoublePointsActive(true);
        setTimeout(() => setDoublePointsActive(false), TEMPORAL_EFFECT_DURATION * 1000);
        break;
      case 'trap':
        setInvertedControls(true);
        setTimeout(() => setInvertedControls(false), TRAP_EFFECT_DURATION * 1000);
        break;
      default:
        break;
    }

    removeItem(item);
  }, [user, updatePuntuacion, gameOver, doublePointsActive]);

  const removeItem = (item) => {
    const regenerateItem = (type, color) => ({
      id: Math.random().toString(36).substring(7),
      position: randomPosition(4),
      size: ITEM_SIZE,
      color,
      type,
      velocity: randomVelocity()
    });
  
    switch (item.type) {
      case 'good':
        setGoodItems(current => [...current.filter(i => i.id !== item.id), regenerateItem('good', 'green')]);
        break;
      case 'harmful':
        setHarmfulItems(current => [...current.filter(i => i.id !== item.id), regenerateItem('harmful', 'black')]);
        break;
      case 'neutral':
        setNeutralItems(current => [...current.filter(i => i.id !== item.id), regenerateItem('neutral', 'gray')]);
        break;
      case 'temporal':
        setTemporalItems(current => [...current.filter(i => i.id !== item.id), regenerateItem('temporal', 'blue')]);
        break;
      case 'trap':
        setTrapItems(current => [...current.filter(i => i.id !== item.id), regenerateItem('trap', 'red')]);
        break;
      default:
        break;
    }
  };
  

  const handlePulse = useCallback(() => {
    if (gameOver || showIntroModal) return;
    setPlayerPos(prev => {
      let [x, y, z] = prev;
      const dx = x - 0;
      const dz = z - 0;
      const dist = Math.sqrt(dx*dx + dz*dz);

      let pushX = dx;
      let pushZ = dz;

      if (dist < 0.1) {
        pushX = (Math.random()-0.5)*0.1;
        pushZ = (Math.random()-0.5)*0.1;
      } else {
        pushX /= dist;
        pushZ /= dist;
      }

      x += pushX * 0.2;
      z += pushZ * 0.2;

      if (Math.abs(x) > AREA_SIZE || Math.abs(z) > AREA_SIZE) {
        endGame("Un pulso te sacó del área! Has perdido.");
        return prev;
      }

      return [x, y, z];
    });
  }, [gameOver, showIntroModal, endGame]);

  useEffect(() => {
    if (!gameOver && itemsInitialized && !showIntroModal) {
      const totalItems = harmfulItems.length + goodItems.length + neutralItems.length + temporalItems.length + trapItems.length;
      if (totalItems === 0) {
        endGame("¡No quedan moléculas! Quizz Terminado.");
      }
    }
  }, [harmfulItems, goodItems, neutralItems, temporalItems, trapItems, gameOver, endGame, showIntroModal, itemsInitialized]);

  if (gameOver) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h1>{message}</h1>
        {user && <p>Puntuación Final: {user.puntuacion}</p>}
      </div>
    );
  }

  const barWidth = 200;
  const envBarStyle = {
    position: 'absolute',
    top: '70px', left: '50%',
    transform: 'translateX(-50%)',
    width: `${barWidth}px`,
    height: '20px',
    background: '#777',
    borderRadius: '5px',
    overflow: 'hidden',
    zIndex: 10,
    border: '2px solid #222'
  };
  const envFillStyle = {
    width: `${environmentState}%`,
    height: '100%',
    background: 'green',
    transition: 'width 0.2s linear'
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position:'relative' }}>
      <div style={envBarStyle}>
        <div style={envFillStyle}></div>
      </div>
      <div style={{position:'absolute', top:'70px', left:'50%', transform:'translateX(-50%)', color:'#fff', zIndex:11}}>
        <p style={{margin:0, padding:'0 5px'}}>Capa de Ozono</p>
      </div>

      <div style={{
        position: 'absolute', bottom: '10px', right: '10px', color: '#fff', zIndex: 10, background: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '5px'
      }}>
        {user ? <h3>Puntuación: {user.puntuacion}</h3> : <p>No estás logueado.</p>}
        <h3>Tiempo restante: {timeLeft}s</h3>
        {doublePointsActive && <p style={{color:'yellow'}}>Doble de puntos activo!</p>}
        {invertedControls && <p style={{color:'red'}}>Controles Invertidos!</p>}
      </div>

      {showIntroModal && (
        <div style={{
          position:'absolute', top:0,left:0,width:'100%',height:'100%',
          background:'rgba(100,100,100,0.8)' ,color:'#fff',zIndex:999,display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',padding:'20px',textAlign:'center'
        }}>
          <h2 style={{ color: '#fff' }}>Instrucciones del Minijuego</h2>
          <p>Usa únicamente las flechas del teclado para mover el recolector (Nave).</p>
          <div style={{textAlign:'left',maxWidth:'400px', margin:'0 auto'}}>

            <p><span style={{display:'inline-block', width:'20px', height:'20px', background:'green', borderRadius:'50%', marginRight:'5px'}}></span><strong>Moléculas Verdes (Buenas):</strong> Como O2 (oxígeno), suman puntos, añaden tiempo y mejoran la capa de ozono.</p>

            <p><span style={{display:'inline-block', width:'20px', height:'20px', background:'black', borderRadius:'50%', marginRight:'5px'}}></span><strong>Moléculas Negras (Malas):</strong> Como CO2 (dióxido de carbono), restan puntos y tiempo.</p>

            <p><span style={{display:'inline-block', width:'20px', height:'20px', background:'gray', borderRadius:'50%', marginRight:'5px'}}></span><strong>Moléculas Grises (Neutras):</strong> Como N2 (nitrógeno), no afectan tus puntos ni tu tiempo.</p>

            <p><span style={{display:'inline-block', width:'20px', height:'20px', background:'blue', borderRadius:'50%', marginRight:'5px'}}></span><strong>Moléculas Azules (Temporales):</strong> Como H2O (agua), brindan efectos positivos temporales (ej. doble puntaje).</p>

            <p><span style={{display:'inline-block', width:'20px', height:'20px', background:'red', borderRadius:'50%', marginRight:'5px'}}></span><strong>Moléculas Rojas (Trampa):</strong> Como NOx (óxidos de nitrógeno), invierten tus controles temporalmente.</p>


          </div>
          <p>Evita salir del área delimitada. Un objeto central emite pulsos que te empujan.</p>
          <button onClick={() => {
            setShowIntroModal(false);
            initializeItems(); // Generar ítems al iniciar
          }} style={{padding:'10px 20px',marginTop:'20px',cursor:'pointer'}}>Empezar</button>
        </div>
      )}

      <Canvas camera={{ position: [0, 5, 5], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <OrbitControls />

        {/* Plano base */}
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[AREA_SIZE*2, AREA_SIZE*2]} />
          <meshStandardMaterial color="#CFD8DC"/>
        </mesh>

        {/* Jugador */}
        <PlayerModel position={playerPos} />

        {/* Render ítems sólo si están inicializados y el juego ya empezó */}
        {!showIntroModal && itemsInitialized && (
          <>
            {harmfulItems.map(item => (
              <Collectable
                key={item.id}
                item={item}
                playerPos={playerPos}
                playerSize={PLAYER_SIZE}
                onCollected={handleCollected}
                gameOver={gameOver}
              />
            ))}
            {goodItems.map(item => (
              <Collectable
                key={item.id}
                item={item}
                playerPos={playerPos}
                playerSize={PLAYER_SIZE}
                onCollected={handleCollected}
                gameOver={gameOver}
              />
            ))}
            {neutralItems.map(item => (
              <Collectable
                key={item.id}
                item={item}
                playerPos={playerPos}
                playerSize={PLAYER_SIZE}
                onCollected={handleCollected}
                gameOver={gameOver}
              />
            ))}
            {temporalItems.map(item => (
              <Collectable
                key={item.id}
                item={item}
                playerPos={playerPos}
                playerSize={PLAYER_SIZE}
                onCollected={handleCollected}
                gameOver={gameOver}
              />
            ))}
            {trapItems.map(item => (
              <Collectable
                key={item.id}
                item={item}
                playerPos={playerPos}
                playerSize={PLAYER_SIZE}
                onCollected={handleCollected}
                gameOver={gameOver}
              />
            ))}
          </>
        )}

        {/* Objeto Central con pulsos */}
        <PulseObject onPulse={handlePulse} />
      </Canvas>
    </div>
  );
};

export default CollectorGame;

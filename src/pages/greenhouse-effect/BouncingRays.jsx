import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Ray({ startPosition, direction, onComplete, onImpact }) {
  const rayRef = useRef();
  const [rebounces, setRebounces] = useState(0);
  const [timerStarted, setTimerStarted] = useState(false);

  useFrame(() => {
    if (rayRef.current) {
      const position = rayRef.current.position;

      // Mover el rayo en la dirección actual
      position.addScaledVector(direction, 0.01);

      // Detectar colisiones con la Tierra
      const distanceToEarth = position.length();
      if (rebounces === 0 && distanceToEarth <= 0.5) {
        if (onImpact) {
          // Calcular la posición de impacto en coordenadas del mundo
          const worldPosition = new THREE.Vector3().copy(position);
          onImpact(worldPosition); // Notificar a la Tierra del impacto
        }

        direction.negate(); // Rebotar hacia afuera
        setRebounces(Math.random() < 0.5 ? 1 : 2); //1 o 2

                // Inicia un temporizador para desaparecer después de 5 segundos
                if (!timerStarted) {
                  setTimerStarted(true);
                  setTimeout(() => {
                    onComplete(); // Desaparecer la esfera
                  }, 5000); // 5 segundos
                }

      } else if (rebounces === 1 && distanceToEarth >= 0.6) {
        direction.negate(); // Rebotar hacia adentro
        setRebounces(3); //2
      }

      if (rebounces >= 3) { //2
        onComplete();
      }
    }
  });

  return (
    <mesh ref={rayRef} position={startPosition}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshBasicMaterial color="yellow" />
    </mesh>
  );
}

function BouncingRays({ onImpact, sunPosition }) {
  const [rays, setRays] = useState([]);

  useFrame(() => {
    // Generar conos periódicamente
    if (Math.random() < 0.02 && rays.length < 10) {
      // Generar posiciones solo en la parte iluminada de la Tierra
      const randomDirection = new THREE.Vector3(
        Math.random() * 2 - 1,
        Math.random() * 2 - 1,
        Math.random() * 2 - 1
      ).normalize();

      // Verificar si el vector apunta hacia el Sol
      const dotProduct = randomDirection.dot(new THREE.Vector3().subVectors(sunPosition, new THREE.Vector3(0, 0, 0)).normalize());
      if (dotProduct > 0.5) { // Solo generar si el punto está hacia el Sol
        const startPosition = randomDirection.multiplyScalar(3); // Posicionar fuera de la capa de ozono
        const direction = startPosition.clone().normalize().negate(); // Dirección hacia la Tierra

        setRays((prev) => [
          ...prev,
          { id: Math.random(), startPosition, direction },
        ]);
      }
    }

    // Limpiar conos que han desaparecido
    setRays((prev) => prev.filter((ray) => !ray.completed));
  });

  return (
    <group>
      {rays.map((ray) => (
        <Ray
          key={ray.id}
          startPosition={ray.startPosition}
          direction={ray.direction}
          onComplete={() =>
            setRays((prev) => prev.map((r) => (r.id === ray.id ? { ...r, completed: true } : r)))
          }
          onImpact={onImpact}
        />
      ))}
    </group>
  );
}

export default BouncingRays;
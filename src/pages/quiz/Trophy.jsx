/* eslint-disable react/prop-types */
/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import { useGLTF, Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Trophy = ({ type = 'gold', ...props }) => {
  const { nodes, materials } = useGLTF('/trophy.glb');
  const trophyRef = useRef();

  // Animación de rotación
  useFrame(() => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y += 0.01;
    }
  });

  // Función para obtener el color del material según el tipo
  const getMaterialSettings = (trophyType) => {
    switch (trophyType) {
      case 'gold':
        return { color: '#FFD700', metalness: 2.5, roughness: 2, emissive: '#FFD700', emissiveIntensity: 0.1 }; // Dorado brillante con más luz
      case 'silver':
        return { color: '#C0C0C0', metalness: 0.8, roughness: 0.3 }; // Plateado
      case 'bronze':
        return { color: '#CD7F32', metalness: 0.6, roughness: 0.4 }; // Bronce
      case 'below-bronze':
        return { color: '#5A3D31', metalness: 0.3, roughness: 0.8 }; // Marrón oscuro y apagado
      default:
        return { color: '#FFFFFF', metalness: 0, roughness: 1 }; // Blanco mate
    }
  };

  // Función para obtener la etiqueta del tipo de trofeo
  const getLabel = (trophyType) => {
    switch (trophyType) {
      case 'gold':
        return 'Trofeo de Oro';
      case 'silver':
        return 'Trofeo de Plata';
      case 'bronze':
        return 'Trofeo de Bronce';
      case 'below-bronze':
        return 'Trofeo de Participación';
      default:
        return 'Unknown Trophy';
    }
  };

  // Configuración del material
  const { color, metalness, roughness, emissive = '#000000', emissiveIntensity = 0 } = getMaterialSettings(type);

  // Etiqueta del trofeo
  const label = getLabel(type);

  return (
    <group {...props} dispose={null}>
      <group ref={trophyRef}>
        {/* Luz direccional */}
        <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />

        {/* Malla principal del trofeo */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh856096890.geometry}
          material={materials.mat12}
          material-color={color}
          material-metalness={metalness}
          material-roughness={roughness}
          material-emissive={emissive}
          material-emissiveIntensity={emissiveIntensity}
        />

        {/* Malla secundaria del trofeo */}
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.mesh856096890_1.geometry}
          material={materials.mat20}
          material-color={color}
          material-metalness={metalness}
          material-roughness={roughness}
          material-emissive={emissive}
          material-emissiveIntensity={emissiveIntensity}
        />
      </group>

      {/* Texto del trofeo */}
      <Text
        position={[0, -0.4, 0]}
        fontSize={0.09}
        color={color}
        anchorX="center"
        anchorY="middle"
      >
        {label}
      </Text>
    </group>
  );
};

export default Trophy;

useGLTF.preload('/trophy.glb');

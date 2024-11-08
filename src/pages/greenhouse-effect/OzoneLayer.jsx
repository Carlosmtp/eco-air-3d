/**
 * @file OzoneLayer.jsx
 * @description  * OzoneLayer component that renders a semi-transparent 3D sphere representing the Earth's ozone layer.
 * @returns {JSX.Element} A 3D sphere mesh with a translucent material simulating the ozone layer.
 * @date Created: 27/10/2024
 * @updated: 31/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import { useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

function OzoneLayer() {
  const ozoneRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Efecto de iluminación al pasar el ratón
  useFrame(() => {
    if (ozoneRef.current) {
      ozoneRef.current.material.emissiveIntensity = hovered ? 0.5 : 0.1;
    }
  });

  return (
    <mesh
      ref={ozoneRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.52, 64, 64]} />
      <meshPhysicalMaterial
        transparent
        opacity={0.3}
        roughness={0.5}
        emissive={new THREE.Color('#00aaff')}
        emissiveIntensity={0.1}
        color="#00aaff"
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export default OzoneLayer;

/**
 * @file Moon.jsx
 * @description This component renders a 3D scene showcasing the OzoneLayer.
 * @date Created: 28/10/2024
 * @updated: 31/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import * as THREE from 'three';

function OzoneLayer() {
  return (
    <mesh>
      <sphereGeometry args={[0.52, 64, 64]} />
      <meshPhysicalMaterial
        transparent
        opacity={0.1}
        roughness={0.5}
        color="#00aaff"
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export default OzoneLayer;

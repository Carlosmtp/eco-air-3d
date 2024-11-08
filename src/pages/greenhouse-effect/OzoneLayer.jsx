/**
 * @file OzoneLayer.jsx
 * @description  * OzoneLayer component that renders a semi-transparent 3D sphere representing the Earth's ozone layer.
 * @returns {JSX.Element} A 3D sphere mesh with a translucent material simulating the ozone layer.
 * @date Created: 27/10/2024
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
        opacity={0.3}
        roughness={0.5}
        color="#00aaff"
        side={THREE.BackSide}
      />
    </mesh>
  );
}

export default OzoneLayer;

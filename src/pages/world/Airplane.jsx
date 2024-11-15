/* eslint-disable react/prop-types */
/* eslint-disable react/no-unknown-property */

import { useGLTF } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Airplane = ({ props }) => {
  const { nodes, materials } = useGLTF('/airplane.glb');
  const propellerRef = useRef();

  useFrame(() => {
    if (propellerRef.current) {
      propellerRef.current.rotation.z += 0.2;
    }
  });

  return (
    <group {...props} dispose={null}
      rotation={[0, 1.7, 0]} 
      scale={[0.3, 0.3, 0.3]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Fuselage_Cube003-Mesh'].geometry}
        material={materials.White}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Fuselage_Cube003-Mesh_1'].geometry}
        material={materials.Red}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Fuselage_Cube003-Mesh_2'].geometry}
        material={materials.Gray}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes['Fuselage_Cube003-Mesh_3'].geometry}
        material={materials.Black}
      />
      <group ref={propellerRef}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['Propeller_Cone-Mesh'].geometry}
          material={materials.Black}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['Propeller_Cone-Mesh_1'].geometry}
          material={materials.Gray}
        />
      </group>
    </group>
  );
};

useGLTF.preload('/airplane.glb');

export default Airplane;

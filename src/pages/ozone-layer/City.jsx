/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'

const City = (props) => {
  const { nodes, materials } = useGLTF('/city.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh303670317.geometry}
        material={materials.mat17}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh303670317_1.geometry}
        material={materials.mat16}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh303670317_2.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh303670317_3.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh303670317_4.geometry}
        material={materials.mat15}
      />
    </group>
  );
};

export default City;

useGLTF.preload('/city.glb')
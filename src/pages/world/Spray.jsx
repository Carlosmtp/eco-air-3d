/* eslint-disable react/no-unknown-property */
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

const Spray = (props) => {
  const { nodes, materials } = useGLTF("/spray.glb");
  const sprayRef = useRef();

  // Usamos useFrame para animar la rotación del grupo sobre el eje Y
  useFrame((state, delta) => {
    if (sprayRef.current) {
      sprayRef.current.rotation.y += delta * 0.5; // Ajusta la velocidad de rotación
    }
  });

  return (
    <group 
      ref={sprayRef} 
      {...props} 
      dispose={null}
      rotation={[0.5, 0, 0]} // Inclina el modelo ligeramente alrededor del eje X
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh430989756.geometry}
        material={materials.mat23}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh430989756_1.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh430989756_2.geometry}
        material={materials.mat22}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh430989756_3.geometry}
        material={materials.mat3}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh430989756_4.geometry}
        material={materials.mat5}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh430989756_5.geometry}
        material={materials.mat4}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh430989756_6.geometry}
        material={materials.mat8}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh430989756_7.geometry}
        material={materials.mat12}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh430989756_8.geometry}
        material={materials.mat15}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh430989756_9.geometry}
        material={materials.mat14}
      />
    </group>
  );
};

useGLTF.preload("/spray.glb");

export default Spray;

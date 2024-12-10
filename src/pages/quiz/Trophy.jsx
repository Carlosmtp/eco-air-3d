/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

const Trophy = (props) => {
  const { nodes, materials } = useGLTF('/trophy.glb')
  const trophyRef = useRef()

  // Animación de rotación
  useFrame(() => {
    if (trophyRef.current) {
      trophyRef.current.rotation.y += 0.01
    }
  })

  return (
    <group {...props} dispose={null} ref={trophyRef}>
      {/* Luz direccional */}
      <directionalLight
        position={[5, 5, 5]}
        intensity={1}
        castShadow
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh856096890.geometry}
        material={materials.mat12}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh856096890_1.geometry}
        material={materials.mat20}
      />
    </group>
  )
}

export default Trophy

useGLTF.preload('/trophy.glb')

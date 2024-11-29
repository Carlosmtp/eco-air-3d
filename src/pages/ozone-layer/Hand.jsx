/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import { useAnimations } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

const Hand = (props) => {
    const group = useRef()
    const { nodes, materials, animations } = useGLTF('/hand.glb')
    const { actions } = useAnimations(animations, group)

    useEffect(() => {
        // Reproducir todas las animaciones en bucle, hacerlas más lentas y con rebote
        animations.forEach((animation) => {
            if (actions[animation.name]) {
                actions[animation.name].setLoop(THREE.LoopPingPong, Infinity) // Loop en ping pong
                actions[animation.name].play()
                actions[animation.name].timeScale = 0.5 // Ajusta la velocidad de la animación (más lenta)
            }
        })
    }, [actions, animations])

    return (
        <>
            {/* Luz Ambiental (Ambient Light) */}
            <ambientLight intensity={0.4} color="white" />

            {/* Luz Direccional (Directional Light) */}
            <directionalLight
                intensity={1}
                color="white"
                position={[5, 5, 5]}
                castShadow
            />

            {/* Luz de Relleno (Fill Light) */}
            <pointLight
                intensity={0.6}
                color="white"
                position={[-5, -5, 5]}
                castShadow
            />

            <group ref={group} {...props} dispose={null}>
                <group name="Root_Scene">
                    <group name="RootNode">
                        <group
                            name="Armature"
                            position={[1.166, 0.123, 0]}
                            rotation={[Math.PI / 2, -1.484, -Math.PI]}
                            scale={100}>
                            <primitive object={nodes.HandMain} />
                        </group>
                        <skinnedMesh
                            name="Hand"
                            geometry={nodes.Hand.geometry}
                            material={materials.DefaultMaterial}
                            skeleton={nodes.Hand.skeleton}
                            position={[-0.005, 0.054, -0.009]}
                            scale={380}
                        />
                    </group>
                </group>
            </group>
        </>
    );
};

export default Hand;

useGLTF.preload('/hand.glb')

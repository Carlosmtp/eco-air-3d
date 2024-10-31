/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/**
 * @file Earth.jsx
 * @description This file defines the `Earth` component, which loads and renders a 3D model of the Earth in GLTF format with continuous rotation.
 * @date Created: 31/10/2024
 * @date Last Modified: 31/10/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 */

import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

const Earth = (props) => {
    const { nodes, materials } = useGLTF('/earth.glb');
    const earthRef = useRef();

    useFrame((state, delta) => {
        if (earthRef.current) {
            earthRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <group ref={earthRef} {...props} dispose={null} scale={[2.5, 2.5, 2.5]}>
            <group name="Sketchfab_Scene">
                <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
                    <group name="Root">
                        <group name="Icosphere001">
                            <mesh
                                name="Icosphere001_0"
                                geometry={nodes.Icosphere001_0.geometry}
                                material={materials.material}
                            />
                            <mesh
                                name="Icosphere001_1"
                                geometry={nodes.Icosphere001_1.geometry}
                                material={materials.green}
                                castShadow
                                receiveShadow
                            />
                            <mesh
                                name="Icosphere001_2"
                                geometry={nodes.Icosphere001_2.geometry}
                                material={materials.white}
                                castShadow
                                receiveShadow
                            />
                        </group>
                    </group>
                </group>
            </group>
        </group>
    );
};

useGLTF.preload('/earth.glb');
export default Earth;

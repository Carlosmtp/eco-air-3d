/* eslint-disable no-undef */
/* eslint-disable react/no-unknown-property */
/**
 * @file Clouds.jsx
 * @description This file defines the `Clouds` component, which loads and renders a 3D model of clouds in GLTF format.
 * @date Created: 31/10/2024
 * @date Last Modified: 31/10/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 */

import { useGLTF } from '@react-three/drei';

const Clouds = (props) => {
    const { nodes, materials } = useGLTF('/clouds.glb');
    return (
        <group {...props} dispose={null} scale={[3, 3, 3]}>
          <mesh castShadow receiveShadow geometry={nodes.Node.geometry} material={materials.mat21} />
        </group>
      )
    }
    
useGLTF.preload('/clouds.glb')

export default Clouds;
    
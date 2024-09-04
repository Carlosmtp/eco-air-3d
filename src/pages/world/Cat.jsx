/**
 * @file World.jsx
 * @description This file defines the `World` component, which renders a 3D scene using React Three Fiber and Drei utilities.
 * @date Created: 04/09/2024
 * @date Last Modified: 04/09/2024
 * @author Andres Mauricio Ortiz Bermudez
 *         ortiz.andres@correounivalle.edu.co
 */

import React from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

/**
 * @component Cat
 * @description The `Cat` component loads a 3D cat model and animates its vertical position using `useGLTF`.
 * @returns {JSX.Element} A JSX element containing the 3D cat model.
 */

const Cat = () => {
    // Load the 3D model of a cat from the specified .glb file
    const { scene } = useGLTF("/models/Cat.glb"); // .glb model path
    const modelRef = React.useRef(); // Reference to manipulate the model within the scene

    // Animation loop: updates the vertical position of the model based on a cosine wave
    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.position.y = Math.cos(Date.now() * 0.001) ;
        }
      });
  return (
    // Render the loaded 3D model with a scale of 0.5 and rotated -90 degrees on the Y axis
    <primitive
        ref={modelRef}
        // eslint-disable-next-line react/no-unknown-property
        object={scene}
        // eslint-disable-next-line react/no-unknown-property
        rotation={[0, -Math.PI / 2, 0]} // Rotate model -90 degrees on the Y axis to face front
    />
    // <primitive> is used to render a loaded Three.js object
  );
};

export default Cat;

/**
 * @file Sphere.jsx
 * @description This file defines the `Sphere` component, which renders a 3D sphere using React Three Fiber.
 * @date Created: 03/09/2024
 * @date Last Modified: 04/09/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 */

import { useFrame } from "@react-three/fiber";
import React, { useRef } from "react";

/* eslint-disable react/no-unknown-property */
/**
 * @component Sphere
 * @description The `Sphere` component renders a 3D sphere using `@react-three/fiber`. The sphere has a
 * standard material with a blue color and oscillates in the x-direction between -8 and 8.
 * @returns {JSX.Element} A JSX element containing a 3D sphere with specified geometry and material properties.
 * @example
 * // Example usage:
 * <Sphere />
 */
const Sphere = () => {
  const sphereRef = useRef(null);

  // Define the amplitude and frequency for oscillation
  const amplitude = 8; // Max displacement in the x-direction
  const frequency = 0.5; // Speed of oscillation

  useFrame((state) => {
    if (sphereRef.current) {
      // Calculate the new x position using a sine function
      const time = state.clock.getElapsedTime();
      const x = amplitude * Math.sin(time * frequency);
      
      // Update the position of the sphere
      sphereRef.current.position.x = x;
      sphereRef.current.position.y = Math.cos(x); // Oscillates in y based on x
    }
  });

  return (
    <React.Fragment>
      <mesh ref={sphereRef}
            position={[0, 0, 0]}
            name="sphere">
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshToonMaterial color="purple" />
        {/* <meshStandardMaterial color="blue" /> */}
      </mesh>
    </React.Fragment>
  );
};

export default Sphere;

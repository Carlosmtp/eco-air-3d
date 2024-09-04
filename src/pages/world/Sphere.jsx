/**
 * @file Sphere.jsx
 * @description This file defines the `Sphere` component, which renders a 3D sphere using React Three Fiber.
 * @date Created: 03/09/2024
 * @date Last Modified: 04/09/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 * @author Andres Mauricio Ortiz Bermudez
 *         ortiz.andres@correounivalle.edu.co
 */

import React from "react";
import { useFrame } from "@react-three/fiber";


/* eslint-disable react/no-unknown-property */

/**
 * @component Sphere
 * @description The `Sphere` component renders a 3D sphere using `@react-three/fiber`. The sphere has a
 * standard material with a blue color.
 * @returns {JSX.Element} A JSX element containing a 3D sphere with specified geometry and material properties.
 * @example
 * // Example usage:
 * <Sphere />
 */
const Sphere = () => {
  const sphereRef = React.useRef();

  // Use useFrame to apply the animation on each frame
  useFrame(() => {
    if (sphereRef.current) {
      sphereRef.current.position.y = Math.cos(Date.now() * 0.001) * 2;
    }
  });

  return (
    <React.Fragment>
      <mesh name="sphere" ref={sphereRef}>
     {/* Geometry of a toroidal knot with a radius of 0.3,
     a thickness of 0.1, 100 segments along the knot and 16 radial segments */}
      <torusKnotGeometry args={[0.3, 0.1, 100, 16]} />
      {/* Physical material to give it a better finish */}
      <meshPhysicalMaterial color="purple" roughness={0.3} metalness={0.8} />
      </mesh>
    </React.Fragment>
  );
};

export default Sphere;

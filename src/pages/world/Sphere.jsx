/**
 * @file Sphere.jsx
 * @description This file defines the `Sphere` component, which renders a 3D sphere using React Three Fiber.
 * @date Created: 03/09/2024
 * @date Last Modified: 04/09/2024
 * @author Carlos Mauricio Tovar Parra
 *         carlos.mauricio.tovar@correounivalle.edu.co
 */

import React from "react";

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
  return (
    <React.Fragment>
      <mesh name="sphere">
        {/* Define the geometry of the sphere with a radius of 0.3 and high detail (32 segments). */}
        <sphereGeometry args={[0.3, 32, 32]} />
        
        {/* Apply a standard material with a blue color to the sphere. */}
        <meshStandardMaterial color="blue" />
      </mesh>
    </React.Fragment>
  );
};

export default Sphere;

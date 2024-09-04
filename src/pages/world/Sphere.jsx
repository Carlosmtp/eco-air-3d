import React from "react";

/* eslint-disable react/no-unknown-property */
const Sphere = () => {

  return (
    <React.Fragment>
        <mesh name="sphere">
          <sphereGeometry args={[0.3, 32, 32]} />
          <meshStandardMaterial color="blue" />
        </mesh>
    </React.Fragment>
  );
};
export default Sphere;

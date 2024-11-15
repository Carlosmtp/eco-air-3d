/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import AirplaneWithBanner from './AirplaneWithBanner';

const InfoCard = ({ onClose, scrollPosition }) => {
  const navigate = useNavigate();

  const handleEnter = () => {
    onClose();
    setTimeout(() => {
      navigate("/World");
    }, 300);
  };

  return (
    <>
      <Canvas>
        <AirplaneWithBanner
          position={[8, 0, 0]}
          scale={[0.3, 0.3, 0.3]}
          rotation={[0, 1.2, 0]}
          scrollPosition={scrollPosition}
        />
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]} intensity={500} />
      </Canvas>
    </>
  );
};

export default InfoCard;

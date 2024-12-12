/**
 * @file HelpModel.jsx
 * @description This component displays the help modal and has the configuration of
 * the model that is displayed for the help
 * @date Created: 28/10/2024
 * @updated: 31/10/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { Html } from '@react-three/drei';

const HelpModel = ({ modelUrl }) => {
  const { scene } = useGLTF("/models/greenhouse/help.glb"); // Cargar el modelo GLTF
  const [showModal, setShowModal] = useState(false);

  const handleClick = () => {
    setShowModal(true);
  };

  return (
    <>
      {/* Modelo 3D */}
      <primitive
        object={scene}
        onClick={handleClick}
        position={[-1.2, -0.4, 0]} // Ajustar posición en la escena
        scale={[0.5, 0.4, 0.4]} // Ajustar tamaño del modelo
        rotation={[Math.PI / 1, 0.5, 0]}
      />

              {/* Texto debajo del modelo GLTF */}
              <Html position={[-1.2, -0.66, 0]} center>
          <div
            onClick={handleClick}
            style={{
            color: 'white',
            fontSize: '20px',
            fontWeight: 'bold',
            textAlign: 'center',
            fontFamily: 'Arial, sans-serif'
          }}>
            Leyenda
          </div>
        </Html>

      {/* Modal */}
      {showModal && (
        <Html position={[0, 0, 0]} center>
          <div className="modal-overlay" onClick={() => setShowModal(false)}>
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()} // Evitar cerrar el modal al hacer clic dentro
              style={{
                background: 'white',
                padding: '30px',
                borderRadius: '10px',
                textAlign: 'center',
                width: '3500px', // Ancho ligeramente mayor
                boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Sombra para darle profundidad
              }}
            >
              <h2>Explicación Visual</h2>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
                {/* Mini modelo amarillo */}
                <div
                  style={{
                    backgroundColor: 'yellow',
                    borderRadius: '50%',
                    width: '60px',
                    height: '20px',
                    marginRight: '20px',
                  }}
                />
                <p>Rayos de luz que impactan y colisionan con la Tierra</p>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                {/* Mini modelo rojo */}
                <div
                  style={{
                    backgroundColor: 'red',
                    borderRadius: '50%',
                    width: '60px',
                    height: '20px',
                    marginRight: '20px',
                  }}
                />
                <p>Ubicación de impacto de los rayos provenientes del Sol</p>
              </div>
              <button
                style={{
                  marginTop: '10px',
                  padding: '10px 20px',
                  background: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer',
                }}
                onClick={() => setShowModal(false)}
              >
                Cerrar
              </button>
            </div>
          </div>
        </Html>
      )}
    </>
  );
};

export default HelpModel;

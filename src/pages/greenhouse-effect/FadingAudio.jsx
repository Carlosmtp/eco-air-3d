/**
 * @file FadingAudio.jsx
 * @description  This file takes care of everything related to the sound of the
 * greenhouse scene, the audio input configuration, output, volume and all the corresponding settings.
 * @date Created: 30/10/2024
 * @updated: 5/12/2024
 * @author Andres Mauricio Ortiz
 *         ortiz.andres@correounivalle.edu.co
 */

import { useEffect, useRef } from 'react';

const FadingAudio = ({ audioSrc, fadeDuration = 3 }) => {
  const audioRef = useRef();

  useEffect(() => {
    const audio = new Audio(audioSrc);
    audio.loop = true; // Reproducir indefinidamente
    audioRef.current = audio;

    const fadeInterval = 50; // Intervalo en milisegundos para ajustar el volumen
    let fadeOutTimeout;

    const playWithFadeIn = () => {
      audio.volume = 0; // Comenzar con volumen en 0
      audio.play();

      // Gradual aumento del volumen
      const fadeIn = setInterval(() => {
        if (audio.volume < 1) {
          audio.volume = Math.min(audio.volume + 1 / (fadeDuration * 1000 / fadeInterval), 1);
        } else {
          clearInterval(fadeIn);
        }
      }, fadeInterval);
    };

    const setupFadeOut = () => {
      fadeOutTimeout = setTimeout(() => {
        // Gradual disminución del volumen al final del ciclo
        const fadeOut = setInterval(() => {
          if (audio.volume > 0) {
            audio.volume = Math.max(audio.volume - 1 / (fadeDuration * 1000 / fadeInterval), 0);
          } else {
            clearInterval(fadeOut);
            playWithFadeIn(); // Reproducir nuevamente con fade-in
          }
        }, fadeInterval);
      }, audio.duration * 1000 - fadeDuration * 1000); // Configurar fade-out cerca del final
    };

    // Reproducir con fade-in al cargar
    playWithFadeIn();

    // Configurar el fade-out para cada ciclo
    audio.addEventListener('timeupdate', setupFadeOut);

    return () => {
      clearTimeout(fadeOutTimeout);
      audio.pause();
      audio.removeEventListener('timeupdate', setupFadeOut);
    };
  }, [audioSrc, fadeDuration]);

  return null; // Este componente no renderiza nada visual
};

export default FadingAudio;

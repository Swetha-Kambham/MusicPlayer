import React, { useRef, useEffect } from 'react';
import Webcamera from 'react-webcam';
import PropTypes from 'prop-types';

//const serverBaseURL = `https://${window.location.host}/server`;
const serverBaseURL = `http://localhost:8080`;

const getEmotionOfImage = async (base64) =>
  fetch(serverBaseURL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      base64
    }),
    Cache: 'default'
  })
    .then((response) => response.json())
    .catch(() => {
      return null;
    });

export const Webcam = ({ onLabelChange }) => {
  const webcamRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (webcamRef && webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        const data = await getEmotionOfImage(imageSrc);
        onLabelChange(data?.label);
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [onLabelChange]);

  return <Webcamera mirrored height={150} width={150} ref={webcamRef} />;
};

Webcam.propTypes = {
  onLabelChange: PropTypes.func
};

export default Webcam;

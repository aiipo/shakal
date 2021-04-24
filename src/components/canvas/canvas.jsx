import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import '@tensorflow/tfjs';
const blazeface = require('@tensorflow-models/blazeface');

const Canvas = React.forwardRef((props, ref) => {
  const canvasRef = useRef(null);
  const modelRef = useRef(null);
  const [faces, setFaces] = useState([]);

  const canvasToImage = () => canvasRef.current?.toDataURL('image/jpeg', 1.0);

  const getDataFromImageData = (images) => {
    if (images instanceof Array) {
      return images.map(imageData => {
        const canvas = document.createElement('canvas');
        canvas.getContext('2d').putImageData(imageData, 0, 0);
        return canvas.toDataURL();
      });
    }
  };

  const prediction = async (image) => {
    if (!modelRef.current || !canvasRef.current || !image) return;

    const returnTensors = false;
    const predictions = await modelRef.current.estimateFaces(image, returnTensors);
    const predictedFaces = [];

    if (predictions.length > 0) {
      for (let i = 0; i < predictions.length; i++) {
        const start = predictions[i].topLeft;
        const end = predictions[i].bottomRight;
        const size = [end[0] - start[0], end[1] - start[1]];
        const context = canvasRef.current.getContext('2d');

        // Render a rectangle over each detected face.
        context.fillStyle = 'rgb(184,22,22)';
        context.fillRect(start[0], start[1], size[0], size[1]);
        predictedFaces.push(context.getImageData(start[0], start[1], size[0], size[1]));
      }
    }
    setFaces(getDataFromImageData(predictedFaces));
  };

  const drawOnCanvas = async (image) => {
    if (image) {
      image.onload = () => console.log('loaded!')
      canvasRef.current
        ?.getContext('2d')
        ?.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
      await prediction(image);
    }
  };

  useEffect(() => {
    canvasRef.current = document.createElement('canvas');
    (async () => {
      modelRef.current = await blazeface.load();
    })();
  }, []);

  useImperativeHandle(ref, () => ({
    ...canvasRef.current,
    canvasToImage,
    drawOnCanvas,
    faces,
  }));

  return null;
});

export default Canvas;

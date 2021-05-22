import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import '@tensorflow/tfjs';
import './canvas.scss';
const blazeface = require('@tensorflow-models/blazeface');

const Canvas = React.forwardRef(({ ...attrs }, ref) => {
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
        const [startX, startY] = predictions[i].topLeft;
        const [endX, endY] = predictions[i].bottomRight;
        const [width, height] = [endX - startX, endY - startY];
        const context = canvasRef.current.getContext('2d');

        predictedFaces.push(context.getImageData(startX, startY, width, height));

        // Render a rectangle over each detected face.
        context.strokeStyle = 'rgba(184, 22, 22, 0.8)';
        context.rect(startX, startY, width, height);
        context.stroke();
      }
    }
    setFaces(getDataFromImageData(predictedFaces));
  };

  const drawOnCanvas = async (image) => {
    if (image) {
      const { current: canvas } = canvasRef;

      canvas
        .getContext('2d')
        ?.drawImage(image, 0, 0, canvas.width, canvas.height);
      await prediction(image);
    }
  };

  useEffect(() => {
    (async function loadModel() {
      modelRef.current = await blazeface.load();
    })();
  }, []);

  useImperativeHandle(ref, () => ({
    ...canvasRef.current,
    canvasToImage,
    drawOnCanvas,
    faces,
  }));

  return <canvas className={`canvas ${attrs.className ?? ''}`} ref={canvasRef} />;
});

export default Canvas;

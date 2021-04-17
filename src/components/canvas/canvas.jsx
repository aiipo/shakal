import React, { useEffect, useImperativeHandle, useRef } from 'react';

const Canvas = React.forwardRef((props, ref) => {
  const canvasRef = useRef(null);

  const canvasToImage = () => canvasRef.current?.toDataURL('image/jpeg', 1.0)

  const drawOnCanvas = (image) => {
    canvasRef.current
      ?.getContext('2d')
      ?.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  useEffect(() => {
    canvasRef.current = document.createElement('canvas');
  }, []);

  useImperativeHandle(ref, () => ({
    ...canvasRef.current,
    canvasToImage,
    drawOnCanvas
  }));

  return null;
});

export default Canvas;

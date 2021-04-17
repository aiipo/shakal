import { useRef } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import superagent from 'superagent';
import Canvas from '../canvas/canvas';
import Header from '../header/header';
import { SERVER_URL } from '../../constants/core';
import './App.scss';

function App() {
  const canvasRef = useRef(null);
  const SENDING_TIMESTAMP = 500;
  let intervalId;

  const onPlay = () => {
    intervalId = setInterval(() => {
      if (canvasRef.current) {
        superagent
          .post(`${SERVER_URL}/api/video`)
          .send({ image: canvasRef.current?.canvasToImage() })
          .then(res => console.log(res.body))
          .catch(err => console.log(err));
      }
    }, SENDING_TIMESTAMP);
  };

  const onPause = () => clearInterval(intervalId);

  const onTimeUpdate = ({ target: video }) => {
    canvasRef.current?.drawOnCanvas(video);
  };

  return (
    <Router>
      <div className="app">
        <Header />
        <video
          controls
          crossOrigin='anonymous'
          onTimeUpdate={onTimeUpdate}
          onPlay={onPlay}
          onPause={onPause}
          className='app__video'
        >
          <source src='https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4' />
        </video>
        <Canvas ref={canvasRef} />
      </div>
    </Router>
  );
}

export default App;

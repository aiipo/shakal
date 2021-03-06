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

  const onTimeUpdate = async ({ target: video }) => {
    await canvasRef.current?.drawOnCanvas(video);
  };

  const onPlay = () => {
    intervalId = setInterval(() => {
      if (canvasRef.current) {
        const images = canvasRef.current?.faces;

        if (images?.length) {
          superagent
            .post(`${SERVER_URL}/api/images`)
            .send(images)
            .then(res => console.log(res.body))
            .catch(err => console.log(err));
        }
      }
    }, SENDING_TIMESTAMP);
  };

  const onPause = () => clearInterval(intervalId);

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
          <source src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' />
        </video>
        <Canvas ref={canvasRef} className='app__video' />
      </div>
    </Router>
  );
}

export default App;

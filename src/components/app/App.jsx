import { useRef, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import superagent from 'superagent';
import Canvas from '../canvas/canvas';
import Header from '../header/header';
import { SERVER_URL } from '../../constants/core';
import './App.scss';

function App() {
  const canvasRef = useRef(null);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const SENDING_TIMESTAMP = 500;
  let intervalId;

  const onPlay = () => {
    intervalId = setInterval(async () => {
      if (canvasRef.current) {
        const images = canvasRef.current?.faces;

        if (images?.length) {
          superagent
            .post(`${SERVER_URL}/api/video`)
            .send(images)
            .then(res => console.log(res.body))
            .catch(err => console.log(err));
        }
      }
    }, SENDING_TIMESTAMP);
  };

  const onPause = () => clearInterval(intervalId);

  const onTimeUpdate = async ({ target: video }) => {
    if (isDataLoaded) {
      await canvasRef.current?.drawOnCanvas(video);
    }
  };

  const onWaiting = () => setIsDataLoaded(false);

  const onLoadedData = () => setIsDataLoaded(true);

  return (
    <Router>
      <div className="app">
        <Header />
        <video
          controls
          crossOrigin='anonymous'
          onTimeUpdate={onTimeUpdate}
          onPlay={onPlay}
          onWaiting={onWaiting}
          onSeeking={onWaiting}
          onLoadedData={onLoadedData}
          onPause={onPause}
          className='app__video'
        >
          <source src='https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' />
        </video>
        <Canvas ref={canvasRef} />
      </div>
    </Router>
  );
}

export default App;

import Header from '../header/header';
import { BrowserRouter as Router } from 'react-router-dom';
import UploadImage from '../upload-image/upload-image';
import { SERVER_URL } from '../../constants/core';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <UploadImage serverUrl={`${SERVER_URL}/api/images`} />
      </div>
    </Router>
  );
}

export default App;

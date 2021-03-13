import Header from '../header/header';
import { BrowserRouter as Router } from 'react-router-dom';
import UploadImage from '../upload-image/upload-image';
import './App.scss';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <UploadImage />
      </div>
    </Router>
  );
}

export default App;

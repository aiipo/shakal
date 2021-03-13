import Header from '../header/header';
import './App.scss';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
      </div>
    </Router>
  );
}

export default App;

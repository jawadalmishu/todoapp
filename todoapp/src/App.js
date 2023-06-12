import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import Home from './components/Home';
import Register from './components/Register';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
   <>
    <Routes>
      <Route exact path="/" Component={Home}/>
      <Route exact path="/register" Component={Register}/>
    </Routes>
   </>
  );
}

export default App;

import { Fragment } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Fragment>
      <h1>Straβa!</h1>
      <Router>
        <div>
          <section>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/signup' element={<Signup />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </section>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;

import React, {useState, useEffect} from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
          <h1>Straβa!</h1>
        <div>
          <section>                              
              <Routes>                                                                        
                 <Route path="/" element={<Home/>}/>
                 <Route path="/signup" element={<Signup/>}/>
                 <Route path="/login" element={<Login/>}/>
              </Routes>                    
          </section>
        </div>
      </Router>
  );
}

export default App;

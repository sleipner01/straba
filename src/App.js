import { Fragment } from 'react';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';
import './App.scss';

import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Navbar from './components/navbar/Navbar';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';

const App = ({ pagepath }) => {
  const [user, loading, error] = useAuthState(auth);

  return (
    <Fragment>
      <Box sx={{ flexDirection: 'row' }} class='topbar'>
        <Topbar />
      </Box>
      <Box sx={{ flexDirection: 'row' }} class='sidebar'>
        <Sidebar />
      </Box>
      <Box sx={{ flexDirection: 'row' }} class='content'>
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
      </Box>
      <Box class='box1'>
        <h1>DETTE ER EN BOX</h1>
      </Box>
      <Box class='box2'>
        <h1>DETTE ER OGSÅ EN SATANS BOX</h1>
      </Box>
    </Fragment>
  );
};

export default App;

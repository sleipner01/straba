import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.scss';

import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import { Box } from '@mui/system';

function App() {
  return (
    <div className='mainContainer'>
      <Topbar />
      <Sidebar />
      <Box className='content'>
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
    </div>
  );
}

export default App;

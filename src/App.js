import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import { auth } from './firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import WorkoutOverview from './pages/WorkoutOverview';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className='mainContainer'>
      <Topbar />
      {user && <Sidebar />}
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/workouts' element={<WorkoutOverview />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

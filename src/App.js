import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import { BrowserRouter as Router, Navigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import './App.scss';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Authenticated from './utils/Authenticated';
import { auth } from './firebase';
import Loading from './components/loading/Loading';
import Error from './components/error/Error';
import { useAuthState } from 'react-firebase-hooks/auth';
import WorkoutOverview from './pages/WorkoutOverview';

function App() {
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  return (
    <div className='mainContainer'>
      <Topbar auth={user} />
      {user && <Sidebar />}
      <Router>
        <Routes>
          <Route element={<Authenticated auth={user} />}>
            <Route path='/' element={<Home />} exact />
            <Route path='/workouts' element={<WorkoutOverview />} />
          </Route>
          <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

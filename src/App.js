import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import CreateNewProgram from './pages/CreateNewProgram';
import CreateNewWorkout from './pages/CreateNewWorkout';
import { BrowserRouter as Router, Navigate, Routes, Route } from 'react-router-dom';
import './App.scss';
import Sidebar from './components/sidebar/Sidebar';
import Topbar from './components/topbar/Topbar';
import Authenticated from './utils/Authenticated';
import { auth } from './firebase';
import { Error, LoadingDots, NoMatch } from './components/misc/usefulComponents';
import { useAuthState } from 'react-firebase-hooks/auth';
import WorkoutOverview from './pages/WorkoutOverview';
import { Box } from '@mui/material';
import ProgramPage from './pages/ProgramPage';
import ProgramOverview from './pages/ProgramOverview';
function App() {
  const [user, loading, error] = useAuthState(auth);
  if (loading) {
    return <LoadingDots />;
  }
  if (error) {
    return <Error />;
  }
  return (
    <div className='mainContainer'>
      <Router>
        <Topbar auth={user} />
        {user && <Sidebar />}
        <Box className='content'>
          <Routes>
            <Route element={<Authenticated auth={user} />}>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/workouts' element={<WorkoutOverview />} />
            </Route>
            <Route exact path='/login' element={user ? <Navigate to='/' /> : <Login />} />
            <Route exact path='/signup' element={user ? <Navigate to='/' /> : <Signup />} />
            <Route path='/createNewProgram' element={<CreateNewProgram />} />
            <Route path='/createNewWorkout' element={<CreateNewWorkout />} />
            <Route path='/programs/:id' element={<ProgramPage />} />
            <Route path='/myPrograms' element={<ProgramOverview />} />
            <Route path='*' element={<NoMatch />} />
          </Routes>
        </Box>
      </Router>
    </div>
  );
}
export default App;

import './sidebar.scss';
import { FitnessCenter, Person } from '@mui/icons-material';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import LogoutIcon from '@mui/icons-material/Logout';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import { NavLink, useNavigate } from 'react-router-dom';

export default function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/login');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <Person className='personIcon' />
            <span className='sidebarListPersonText'>Name</span>
          </li>
          <li className='sidebarListItem'>
            <FitnessCenter className='sidebarIcon' />
            <span className='sidebarListItemText'>View programs</span>
          </li>
          <li className='sidebarListItem'>
            <FitnessCenter className='sidebarIcon' />
            <span className='sidebarListItemText'>New program</span>
          </li>
          {/* <li className='sidebarListItem'>
            <FitnessCenter className='sidebarIcon' />
            <span className='sidebarListItemText'>Groups</span>
          </li>
          <li className='sidebarListItem'>
            <FitnessCenter className='sidebarIcon' />
            <span className='sidebarListItemText'>Friends</span>
          </li> */}
          <li>
            <NavLink to='/workouts'>
              <FitnessCenterIcon className='sidebarIcon' />
              <span className='sidebarListItemText'>Workouts</span>
            </NavLink>
          </li>
          <hr className='sidebarLine' />
          <li className='sidebarListItem'>
            <NavLink onClick={handleLogout}>
              <LogoutIcon className='sidebarIcon' />
              <span className='sidebarListItemText'>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

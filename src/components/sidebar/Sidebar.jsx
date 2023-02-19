import './sidebar.scss';
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
            <NavLink to='/workouts'>
              <FitnessCenterIcon className='sidebarIcon' />
              <span className='sidebarListItemText'>Workouts</span>
            </NavLink>
          </li>
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

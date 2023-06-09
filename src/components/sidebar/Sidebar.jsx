import './sidebar.scss';
import { useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { ManageAccounts } from '@mui/icons-material';
import { FitnessCenter, Person } from '@mui/icons-material';
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

  const userDisplayName = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const fullName = user.displayName;
        const firstName = fullName.split(' ')[0];
        userDisplayName.current.innerHTML = firstName ? firstName : 'Chief';
      }
    });
  }, []);

  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <Person className='personIcon' />
            <span className='sidebarListPersonText' ref={userDisplayName}></span>
          </li>
          <li className='sidebarListItem'>
            <NavLink to='/myPrograms' className='navLink'>
              <FitnessCenter className='sidebarIcon' />
              <span className='sidebarListItemText'>View my programs</span>
            </NavLink>
          </li>
          <li className='sidebarListItem'>
            <NavLink to='/workouts' className='navLink'>
              <FitnessCenter className='sidebarIcon' />
              <span className='sidebarListItemText'>Discover programs</span>
            </NavLink>
          </li>
          <li className='sidebarListItem'>
            <NavLink to='/newprogram' className='navLink'>
              <FitnessCenter className='sidebarIcon' />
              <span className='sidebarListItemText'>Create program</span>
            </NavLink>
          </li>
          <hr className='sidebarLine' />
          <li className='sidebarListItem'>
            <NavLink to='/settings' className='navLink'>
              <ManageAccounts className='sidebarIcon' />
              <span className='sidebarListItemText'>Settings</span>
            </NavLink>
          </li>
          <li className='sidebarListItem'>
            <NavLink onClick={handleLogout} className='navLink'>
              <LogoutIcon className='sidebarIcon' />
              <span className='sidebarListItemText'>Logout</span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

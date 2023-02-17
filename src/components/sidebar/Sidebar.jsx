import './sidebar.scss';
import { FitnessCenter, Person } from '@mui/icons-material';

export default function Sidebar() {
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
          <hr className='sidebarLine' />
        </ul>
      </div>
    </div>
  );
}

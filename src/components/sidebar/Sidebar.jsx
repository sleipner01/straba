import './sidebar.scss';
import { RssFeed } from '@mui/icons-material';

export default function Sidebar() {
  return (
    <div className='sidebar'>
      <div className='sidebarWrapper'>
        <ul className='sidebarList'>
          <li className='sidebarListItem'>
            <RssFeed className='sidebarIcon' />
            <span className='sidebarListItemText'>Workouts</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

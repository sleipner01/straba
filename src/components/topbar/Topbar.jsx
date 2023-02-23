import './topbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import { NavLink } from 'react-router-dom';

export default function Topbar({ auth }) {
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <NavLink to='/'>
          <img src='/logo.png' alt='test' className='topbarImg' />
        </NavLink>
      </div>
      {/* <div className='topbarCenter'>
        {auth && (
          <div className='searchbar'>
            <SearchIcon className='searchIcon' />
            <input placeholder='Search for friend, post or video' className='searchInput' />
          </div>
        )}
      </div> */}
      <div className='topbarRight'></div>
    </div>
  );
}

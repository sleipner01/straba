import './topbar.scss';
import { Search } from '@mui/icons-material';

export default function Topbar() {
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <span className='logo'>Straβa</span>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <Search className='searchIcon' />
          <input placeholder='Search for friend, post or video' className='searchInput' />
        </div>
      </div>
      <div className='topbarRight'>
        <img src='./assets/person/1.jpeg' alt='' className='topbarImg' />
      </div>
    </div>
  );
}

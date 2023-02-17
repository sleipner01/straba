import './topbar.scss';
import SearchIcon from '@mui/icons-material/Search';

export default function Topbar() {
  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <span className='logo'>Straβa</span>
      </div>
      <div className='topbarCenter'>
        <div className='searchbar'>
          <SearchIcon className='searchIcon' />
          <input placeholder='Search for friend, post or video' className='searchInput' />
        </div>
      </div>
    </div>
  );
}

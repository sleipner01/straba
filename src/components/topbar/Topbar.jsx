import './topbar.scss';
import SearchIcon from '@mui/icons-material/Search';
import { auth } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Topbar() {
  const [user] = useAuthState(auth);

  return (
    <div className='topbarContainer'>
      <div className='topbarLeft'>
        <span className='logo'>Straβa</span>
      </div>
      <div className='topbarCenter'>
        {user && (
          <div className='searchbar'>
            <SearchIcon className='searchIcon' />
            <input placeholder='Search for friend, post or video' className='searchInput' />
          </div>
        )}
      </div>
      <div className='topbarRight'></div>
    </div>
  );
}

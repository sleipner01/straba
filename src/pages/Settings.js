import { useState, useEffect, useRef } from 'react';
import { Error } from '../components/misc/usefulComponents';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { AccountCircle } from '@mui/icons-material';

const Settings = () => {
  const [name, setName] = useState('');
  const [nameValid, setNameValidState] = useState(false);
  const [nameSubmitDisabled, setNameSubmitDisabledState] = useState(true);
  const [errorText, setError] = useState();
  const [imgLoadedSuccessfully, setImgLoadedSuccessfully] = useState(false);

  const profileImage = useRef();
  const profileIcon = useRef();

  useEffect(() => {
    checkNameSubmitValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameValid]);

  useEffect(() => {
    if (imgLoadedSuccessfully) {
      displayImage();
    } else {
      hideImage();
    }
  }, [imgLoadedSuccessfully]);

  function displayImage() {
    profileImage.current.style.display = 'block';
    profileIcon.current.style.display = 'none';
  }

  function hideImage() {
    profileImage.current.style.display = 'none';
    profileIcon.current.style.display = 'block';
  }

  function checkNameSubmitValid() {
    // check if all fields are valid
    let submitValid = nameValid;
    setNameSubmitDisabledState(!submitValid);
  }

  function handleChangeName(name) {
    // separate handler for each field
    let nameValid = name ? true : false; // basic text validation
    setName(name);
    setNameValidState(nameValid);
  }

  const updateAuthName = async (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log('Updated auth name');
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const deleteProfile = async (e) => {
    alert('yeah');
  };

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <span>Your Name:</span>
        <span>{auth.currentUser.displayName}</span>
      </div>
      <div>
        <img
          src={null}
          onError={() => setImgLoadedSuccessfully(false)}
          onLoad={() => setImgLoadedSuccessfully(true)}
          alt='Profile'
          ref={profileImage}
        />
        <AccountCircle className='personIcon' ref={profileIcon} />
      </div>
      <h2>Update your account information</h2>
      <form>
        <label className='label' htmlFor='name'>
          Name
        </label>
        <br />
        <input
          type='text'
          name='name'
          id='name'
          placeholder={auth.currentUser.displayName ? auth.currentUser.displayName : 'John Doe'}
          className='input'
          value={name}
          onChange={(e) => handleChangeName(e.target.value)}
        />
        <br />
        <button disabled={nameSubmitDisabled} type='submit' onClick={updateAuthName}>
          Update
        </button>
        <br />
        <label htmlFor='deleteProfile'>Delete profile</label>
        <br />
        <button onClick={deleteProfile}>Delete profile</button>
        <br />
        {errorText && <Error errorMessage={errorText} />}
      </form>
    </div>
  );
};

export default Settings;

import { useState, useEffect, useRef } from 'react';
import { Error } from '../components/misc/usefulComponents';
import { auth } from '../firebase';
import { updateProfile, deleteUser } from 'firebase/auth';
import { doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';

const Settings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [nameValid, setNameValidState] = useState(false);
  const [phoneNumberInput, setPhoneNumber] = useState('');
  const [phoneValid, setPhoneValidState] = useState(false);
  const [errorText, setError] = useState();
  const [imgLoadedSuccessfully, setImgLoadedSuccessfully] = useState(false);

  const profileImage = useRef();
  const profileIcon = useRef();

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

  function handleChangeName(name) {
    // separate handler for each field
    let nameValid = name ? true : false; // basic text validation
    setName(name);
    setNameValidState(nameValid);
  }

  function handleChangePhone(input) {
    // separate handler for each field
    let phoneValid = false;
    if (input && input.length === 8) {
      phoneValid = true;
    }

    setPhoneNumber(input);
    setPhoneValidState(phoneValid);
  }

  const updateUserDoc = async (name) => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      name: name,
    })
      .then(() => {
        console.log('Updated user doc');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateAuthName = async (e) => {
    e.preventDefault();
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        updateUserDoc(name);
        console.log('Updated auth name');
        setName('');
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const deleteUserDoc = async (userId) => {
    await deleteDoc(doc(db, 'users', userId))
      .then(() => {
        console.log('Deleted user doc');
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  const deleteProfile = async (e) => {
    e.preventDefault();
    const userId = auth.currentUser.uid;
    deleteUser(auth.currentUser)
      .then(() => {
        deleteUserDoc(userId);
        // User deleted.
        console.log('User deleted');
        navigate('/login');
      })
      .catch((error) => {
        // An error ocurred
        console.err(error);
        setError(error.message);
      });
  };

  const updatePhoneNumber = async (e) => {
    e.preventDefault();
    updateDoc(doc(db, 'users', auth.currentUser.uid), {
      phoneNumber: phoneNumberInput,
    })
      .then(() => {
        console.log('Updated phone number');
        setPhoneNumber('');
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
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
        <button disabled={!nameValid} type='submit' onClick={updateAuthName}>
          Update
        </button>
        <br />
        <label className='label' htmlFor='phoneNumber'>
          Phone Number
        </label>
        <br />
        <input
          type='number'
          name='phoneNumber'
          id='phoneNumber'
          placeholder='12345678'
          className='input'
          value={phoneNumberInput}
          onChange={(e) => handleChangePhone(e.target.value)}
        />
        <button disabled={!phoneValid} type='submit' onClick={updatePhoneNumber}>
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

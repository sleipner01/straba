import { useState, useEffect, useRef } from 'react';
import { Error } from '../components/misc/usefulComponents';
import { auth } from '../firebase';
import { updateProfile, deleteUser } from 'firebase/auth';
import { doc, deleteDoc, updateDoc, getDoc } from 'firebase/firestore';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import './Settings.scss';

const Settings = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [nameValid, setNameValidState] = useState(false);
  const [phoneNumberInput, setPhoneNumber] = useState('');
  const [phoneValid, setPhoneValidState] = useState(false);
  const [errorText, setError] = useState();
  const [imgLoadedSuccessfully, setImgLoadedSuccessfully] = useState(false);

  const [phoneNumber, setPhoneNumberFromFirestore] = useState('');
  const [latestLogin, setLatestLoginFromFirestore] = useState('');
  const [accountCreated, setAccountCreatedFromFirestore] = useState('');

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

  const retrieveUserDataFromFirestore = async () => {
    await getDoc(doc(db, 'users', auth.currentUser.uid))
      .then(() => {
        console.log('Successully retrieved userdoc');
        // TODO
      })
      .catch((error) => {
        console.error(error);
      });
  };

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
    // if (confirm('Are you sure you want to delete your profile?')) {
    // const userId = auth.currentUser.uid;
    // deleteUser(auth.currentUser)
    //   .then(() => {
    //     deleteUserDoc(userId);
    //     // User deleted.
    //     console.log('User deleted');
    //     navigate('/login');
    //   })
    //   .catch((error) => {
    //     // An error ocurred
    //     console.err(error);
    //     setError(error.message);
    //   });
    // }
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
    <div className='settingsContainer'>
      <h1>Settings</h1>
      <div className='accountInformation'>
        <div className='infoSection'>
          <div>
            <span>Name:</span>
            <span>{auth.currentUser.displayName}</span>
          </div>
          <div>
            <span>Email:</span>
            <span>{auth.currentUser.email}</span>
          </div>
          <div>
            <span>Phone Number:</span>
            <span>{phoneNumber ? phoneNumber : ''}</span>
          </div>
          <div>
            <span>Account Created:</span>
            <span>{accountCreated ? accountCreated : 'Not registered'}</span>
          </div>
          <div>
            <span>Latest Login:</span>
            <span>{latestLogin ? latestLogin : 'No log exists'}</span>
          </div>
          {/* TODO
             PhoneNumber
             Latest Login
             Account Created
          */}
        </div>
        <div className='imageSection'>
          <img
            src={null}
            onError={() => setImgLoadedSuccessfully(false)}
            onLoad={() => setImgLoadedSuccessfully(true)}
            alt='Profile'
            ref={profileImage}
            width={100}
            height={100}
          />
          <AccountCircle className='personIcon' ref={profileIcon} />
        </div>
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
        {errorText && <Error errorMessage={errorText} />}
      </form>
      <div className='deleteProfileContainer'>
        <h2>Delete profile</h2>
        <p>
          This action will delete all user data <br /> and cannot be recovered.
        </p>
        <br />
        <button onClick={deleteProfile}>Delete profile</button>
        <br />
      </div>
    </div>
  );
};

export default Settings;

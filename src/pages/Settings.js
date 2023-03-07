import { useState, useEffect } from 'react';
import { Error } from '../components/misc/usefulComponents';
import { auth } from '../firebase';
import { updateProfile } from 'firebase/auth';
import { AccountCircle } from '@mui/icons-material';

const Settings = () => {
  const [name, setName] = useState('');
  const [nameValid, setNameValidState] = useState(false);
  const [nameSubmitDisabled, setNameSubmitDisabledState] = useState(true);
  const [errorText, setError] = useState();

  useEffect(() => {
    checkNameSubmitValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nameValid]);

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

  return (
    <div>
      <h1>Settings</h1>
      <div>
        <span>Your Name:</span>
        <span>{auth.currentUser.displayName}</span>
      </div>
      <div>
        <AccountCircle className='personIcon' />
        <img src={auth.currentUser.photoURL} alt='Profile Picture' width='80px' height='80px' />
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
        {errorText && <Error errorMessage={errorText} />}
      </form>
    </div>
  );
};

export default Settings;

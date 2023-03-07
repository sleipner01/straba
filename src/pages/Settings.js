import { useState, useEffect } from 'react';
import { Error } from '../components/misc/usefulComponents';
import { auth } from '../../firebase';
import { updateProfile } from 'firebase/auth';

const Settings = () => {
  const [name, setName] = useState('');
  const [nameValid, setNameValidState] = useState(false);
  const [submitDisabled, setSubmitDisabledState] = useState(true);
  const [errorText, setError] = useState();

  useEffect(() => {
    checkSubmitValid();
  }, [nameValid]);

  function checkSubmitValid() {
    // check if all fields are valid
    let submitValid = nameValid;
    setSubmitDisabledState(!submitValid);
  }

  function handleChangeName(name) {
    // separate handler for each field
    let nameValid = name ? true : false; // basic text validation
    setName(name);
    setNameValidState(nameValid);
  }

  const updateAuthName = async () => {
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
      <form>
        <label className='label' htmlFor='name'>
          Name
        </label>
        <input
          type='text'
          name='name'
          id='name'
          placeholder='Name'
          className='input'
          value={name}
          onChange={(e) => handleChangeName(e.target.value)}
        />
        <br />
        <label className='label' htmlFor='phoneNumber'>
          Phone Number
        </label>
        <input type='tel' name='phoneNumber' id='phoneNumber' placeholder='Phone Number' className='input' required />
        <br />
        <button disabled={submitDisabled} type='submit' onClick={updateAuthName} required>
          Update
        </button>
        {errorText && <Error errorMessage={errorText} />}
      </form>
    </div>
  );
};

export default Settings;

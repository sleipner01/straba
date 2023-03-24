import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { Error } from '../misc/usefulComponents';
import errorCodeToTextConverter from '../../utils/ErrorCodeToTextConverter';
import './forms.scss';

const SignupForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nameValid, setNameValidState] = useState(false);
  const [emailValid, setEmailValidState] = useState(false);
  const [passwordValid, setPasswordValidState] = useState(false);
  const [submitDisabled, setSubmitDisabledState] = useState(true);
  const [errorText, setError] = useState();

  useEffect(() => {
    checkSubmitValid();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailValid, nameValid, passwordValid]);

  function checkSubmitValid() {
    // check if all fields are valid
    let submitValid = emailValid && nameValid && passwordValid;
    setSubmitDisabledState(!submitValid);
  }

  function handleChangeEmail(mail) {
    // separate handler for each field
    let emailValid = mail ? true : false; // basic email validation
    setEmail(mail);
    setEmailValidState(emailValid);
  }

  function handleChangeName(name) {
    // separate handler for each field
    let nameValid = name ? true : false; // basic text validation
    setName(name);
    setNameValidState(nameValid);
  }

  function handleChangePassword(password) {
    // separate handler for each field
    let passwordValid = password ? true : false; // basic text validation
    setPassword(password);
    setPasswordValidState(passwordValid);
  }

  const createUser = async (user) => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        streak: 0,
        lastLogin: serverTimestamp(),
        created: serverTimestamp(),
      });

      console.log('Document written in firestore');
    } catch (e) {
      console.error('Error adding document: ', e);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        createUser(user);
        updateAuthName();
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        setError(errorCodeToTextConverter(error.code));
      });
  };

  const updateAuthName = async () => {
    updateProfile(auth.currentUser, {
      displayName: name,
    })
      .then(() => {
        console.log('Updated auth name');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <form>
      <div>
        <label className='label' htmlFor='Full name'>
          Full name
        </label>
        <br />
        <input
          className='input'
          type='text'
          label='Full name'
          value={name}
          onChange={(e) => handleChangeName(e.target.value)}
          required
          placeholder='Full name'
        />
      </div>

      <div>
        <label className='label' htmlFor='Email address'>
          Email address
        </label>
        <br />
        <input
          className='input'
          type='email'
          label='Email address'
          value={email}
          onChange={(e) => handleChangeEmail(e.target.value)}
          required
          placeholder='Email address'
        />
      </div>

      <div>
        <label className='label' htmlFor='password'>
          Password
        </label>
        <br />
        <input
          className='input'
          type='password'
          label='Create password'
          value={password}
          onChange={(e) => handleChangePassword(e.target.value)}
          required
          placeholder='Password'
        />
      </div>

      <button disabled={submitDisabled} className='logSignInButton formButton' type='submit' onClick={onSubmit}>
        Sign up
      </button>
      {errorText && <Error errorMessage={errorText} />}
    </form>
  );
};

export default SignupForm;

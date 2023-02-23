import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './forms.scss';

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateLoginTime = async (user) => {
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        lastLogin: serverTimestamp(),
      });
    } catch (e) {
      console.error('Could not update last login time for: ', user.uid);
    }
  };

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/');

        console.log(user);
        updateLoginTime(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <form>
      <div>
        <label className='label' htmlFor='email-address'>
          Email address
        </label>
        <br />
        <input
          className='input'
          id='email-address'
          name='email'
          type='email'
          required
          placeholder='Email address'
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className='label' htmlFor='password'>
          Password
        </label>
        <br />
        <input
          className='input'
          id='password'
          name='password'
          type='password'
          required
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div>
        <button className='logSignInButton' onClick={onLogin}>
          Login
        </button>
      </div>
    </form>
  );
};

export default LoginForm;

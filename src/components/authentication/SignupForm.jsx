import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const SignupForm = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const createUser = async (user) => {
    try {
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        lastLogin: serverTimestamp(),
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
        navigate('/');
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
        <label htmlFor='Full name'>Full name</label>
        <input
          type='text'
          label='Full name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          placeholder='Full name'
        />
      </div>

      <div>
        <label htmlFor='Email address'>Email address</label>
        <input
          type='email'
          label='Email address'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder='Email address'
        />
      </div>

      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          label='Create password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder='Password'
        />
      </div>

      <button type='submit' onClick={onSubmit}>
        Sign up
      </button>
    </form>
  );
};

export default SignupForm;

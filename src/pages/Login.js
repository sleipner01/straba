import React, { Fragment, useState } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate('/');
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  const onSignInWithGoogle = async (e) => {
    e.preventDefault();

    // Sign in using a popup.
    const provider = new GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    await signInWithPopup(auth, provider)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate('/');
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };

  return (
    <Fragment className='fragment'>
      <section className='login'>
        <div className='background'>
          <button className='google' onClick={onSignInWithGoogle}>
            Sign in with Google
          </button>
          <form>
            <div>
              <label className='label' htmlFor='email-address'>
                Email address:{' '}
              </label>
              <br></br>
              <input
                className='input'
                id='email-address'
                name='email'
                type='email'
                required
                // placeholder='Email address'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className='label' htmlFor='password'>
                Password:{' '}
              </label>
              <br></br>
              <input
                className='input'
                id='password'
                name='password'
                type='password'
                required
                // placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <button className='loginButton' onClick={onLogin}>
                Login
              </button>
            </div>
          </form>

          <p className='text-sm text-white text-center'>
            No account yet?{' '}
            <NavLink className={'signup'} to='/signup'>
              Sign up
            </NavLink>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

export default Login;

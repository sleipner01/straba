import React, { Fragment, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';
import './LoginSignup.scss';

const Signup = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();

    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate('/login');
        // ...
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
    <Fragment>
      <section className='login'>
        <div className='background'>
          <div>
            <button className='googleButton' onClick={onSignInWithGoogle}>
              Sign in with Google
            </button>
            <form>
              <div>
                <label className='label' htmlFor='email-address'>
                  Email address:
                </label>
                <br></br>
                <input
                  className='input'
                  type='email'
                  label='Email address'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  // placeholder='Email address'
                />
              </div>

              <div>
                <label className='label' htmlFor='password'>
                  Password:
                </label>
                <br></br>
                <input
                  className='input'
                  type='password'
                  label='Create password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  // placeholder='Password'
                />
              </div>

              <button className='logSignInButton' type='submit' onClick={onSubmit}>
                Sign up
              </button>
            </form>

            <p>
              Already have an account?{' '}
              <NavLink className={'signUpIn'} to='/login'>
                Sign in
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Signup;

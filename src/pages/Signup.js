import React, { Fragment, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase';

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
        // ..
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

    // const result = await signInWithPopup(auth, provider);

    // The signed-in user info.
    // const user = result.user;
    // This gives you a Google Access Token.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
  };

  return (
    <Fragment>
      <section>
        <div>
          <div>
            <form>
              <button onClick={onSignInWithGoogle}>Sign in with Google</button>
              <div>
                <label htmlFor='email-address'>Email address</label>
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

            <p>
              Already have an account? <NavLink to='/login'>Sign in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Signup;

import React, { Fragment, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';

const Signup = () => {
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

  const createUserAsGooglePopup = async (user) => {
    try {
      await setDoc(
        // If the user already exists, merge the new data with the existing data
        doc(db, 'users', user.uid),
        {
          name: user.displayName,
          email: user.email,
          lastLogin: serverTimestamp(),
        },
        { merge: true },
      );

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

        createUserAsGooglePopup(user);

        navigate('/');
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
      <section>
        <div>
          <div>
            <button onClick={onSignInWithGoogle}>Sign in with Google</button>
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

            <p>
              Already have an account? <NavLink to='/login'>Log in</NavLink>
            </p>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Signup;

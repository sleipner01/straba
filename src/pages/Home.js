import React, { useEffect, Fragment, useRef } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';

const Home = () => {
  const userDisplayName = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log('uid', uid);
        console.log('displayname', user.displayName);
        console.log('email', user.email);

        userDisplayName.current.innerHTML = user.displayName
          ? user.displayName
          : process.env.REACT_APP_DEFAULT_USER_WELCOME_NAME;
      } else {
        // User is signed out
        // ...
        console.log('user is logged out');
      }
    });
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigate('/login');
        console.log('Signed out successfully');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <section>
      <Fragment>
        <nav>
          <p>
            Welcome <span ref={userDisplayName}></span>
          </p>
          <div>
            <NavLink to='/login' onClick={handleLogout}>
              Logout
            </NavLink>
          </div>
        </nav>
      </Fragment>
    </section>
  );
};

export default Home;

import React, { useEffect, Fragment, useRef } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';

import Topbar from '../components/topbar/Topbar';
import Sidebar from '../components/sidebar/Sidebar';
import { Box } from '@mui/material';

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

        userDisplayName.current.innerHTML = user.displayName ? user.displayName : 'Chief';
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
    <Fragment>
      <Topbar />
      <Sidebar />
      <Box className='content'>
        <h1>Straβa!</h1>
        <div>
          <section>
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
          </section>
        </div>
      </Box>
    </Fragment>
  );
};

export default Home;

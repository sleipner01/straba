import { useEffect, Fragment, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { NavLink, useNavigate } from 'react-router-dom';

import { Box } from '@mui/material';

const Home = () => {
  const userDisplayName = useRef();
  const user = auth.currentUser;

  useEffect(() => {
    userDisplayName.current.innerHTML = user.displayName ? user.displayName : 'Chief';
  }, [user.displayName]);

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

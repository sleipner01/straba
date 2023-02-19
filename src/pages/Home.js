import { useEffect, Fragment, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

import { Box } from '@mui/material';

const Home = () => {
  const userDisplayName = useRef();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        userDisplayName.current.innerHTML = user.displayName ? user.displayName : 'Chief';
      }
    });
  }, []);

  return (
    <Fragment>
      <Box className='content'>
        <h1>
          Welcome <span ref={userDisplayName}></span>
        </h1>
      </Box>
    </Fragment>
  );
};

export default Home;

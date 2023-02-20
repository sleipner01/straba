import { useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

import NewActivity from '../components/newActivity/NewActivity';

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
    <div>
      <h1>
        Welcome <span ref={userDisplayName}></span>
      </h1>
      <NewActivity />
    </div>
  );
};

export default Home;

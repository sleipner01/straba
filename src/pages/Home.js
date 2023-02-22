import { useEffect, useRef } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';

import NewWorkout from '../components/newWorkout/NewWorkout';

// test data
const program1 = {
  id: 2,
  name: 'program1',
  workouts: [
    {
      name: 'workout1',
      activities: [
        {
          name: 'activity1',
          field1type: 'Reps',
          field1value: 12,
          field2type: 'Sets',
          field2value: 3,
        },
        {
          name: 'activity2',
          field1type: 'Sec',
          field1value: 30,
          description: 'Run for 30 secs',
        },
      ],
    },
    {
      name: 'workout2',
      activities: [
        {
          name: 'activity1',
          field1type: 'Secs',
          field1value: 60,
        },
      ],
    },
  ],
};

const userObject = {
  id: 1,
  username: 'elihaugu',
  programs: [2, 3],
  email: 'elihaugu@stud.ntnu.no',
  fullname: 'Elin Haugum',
};

const program2 = {
  id: 3,
  name: 'program2',
  workouts: [
    {
      name: 'workout1',
      activities: [
        {
          name: 'activity1',
          field1type: 'Secs',
          field1value: 30,
          field2type: 'Sets',
          field2value: 3,
          description: 'Do the exercise 3 times.',
        },
        {
          name: 'activity2',
          field2type: 'Sec',
          field2value: 30,
          description: 'Run for 30 secs',
        },
      ],
    },
  ],
};

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
      <NewWorkout workout={program1.workouts[0]} />
    </div>
  );
};

export default Home;

import { useState } from 'react';
import NewActivity from '../components/newActivity/NewActivity';
import './CreateNewWorkout.scss';

function CreateNewWorkout() {
  const [numActivities, setNumActivities] = useState(1);

  const addNewActivity = () => {
    setNumActivities((prevNumActivities) => prevNumActivities + 1);
  };

  const activities = [];
  for (let i = 0; i < numActivities; i++) {
    activities.push(<NewActivity key={i} />);
    activities.push(<br></br>);
  }

  return (
    <div className='background'>
      <h3 className='titleText'>Workout name:</h3>
      <input className='titleChoosen' placeholder='Workout name'></input>
      <div>
        <button onClick={addNewActivity} className='add'>
          New activity +
        </button>
        <div className='activityWrapper'>{activities}</div>
      </div>
    </div>
  );
}

export default CreateNewWorkout;

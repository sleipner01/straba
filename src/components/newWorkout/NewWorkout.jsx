import * as React from 'react';
import { createContext, useEffect, useContext, useState } from 'react';
import NewActivity from '../newActivity/NewActivity';
import { workoutContext } from '../../pages/CreateNewProgram';
import './NewWorkout.scss';

export const activityContext = createContext();
const allActivities = {};

export default function NewWorkout({ workoutIndex }) {
  const [activityData, setActivityData] = useState({});

  const { workoutData, setWorkoutData } = useContext(workoutContext);
  const [workoutName, setWorkoutName] = useState('');
  const [activities, setActivities] = useState([]);

  const addNewActivity = () => {
    setActivities(
      activities.concat(
        <NewActivity key={activities.length} activityIndex={activities.length} workoutIndex={workoutIndex} />,
      ),
    );
  };

  const handleUpdateWorkoutInfo = () => {
    setWorkoutData({
      workoutIndex: workoutIndex,
      workoutName: workoutName,
      activities: allActivities[workoutIndex],
    });
  };

  // setup useEffect so activity info updates onchange to field1 and field2
  useEffect(() => {
    if (activityData.workoutIndex === workoutIndex && activityData.activityIndex !== undefined) {
      if (!allActivities[workoutIndex]) {
        allActivities[workoutIndex] = [];
      }
      console.log(allActivities);
      allActivities[workoutIndex][activityData.activityIndex] = {
        activityName: activityData.activityName,
        field1Type: activityData.field1Type,
        field1Value: activityData.field1Value,
        field2Type: activityData.field2Type,
        field2Value: activityData.field2Value,
        description: activityData.description,
      };
      console.log(allActivities);
    }
    handleUpdateWorkoutInfo();
  }, [activityData, workoutName]);

  return (
    <activityContext.Provider value={{ activityData, setActivityData }}>
      <div>
        <h3 className='titleText'>Workout name:</h3>
        <input
          onChange={(e) => setWorkoutName(e.target.value)}
          className='titleChosen'
          placeholder='Workout name'
        ></input>
        <div>
          <button onClick={addNewActivity} className='addActivity'>
            New activity +
          </button>
          <div className='activityWrapper'>{activities}</div>
        </div>
      </div>
    </activityContext.Provider>
  );
}

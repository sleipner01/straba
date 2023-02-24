import { createContext, useEffect, useState } from 'react';
import NewActivity from '../components/newActivity/NewActivity';
import './CreateNewWorkout.scss';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const activityContext = createContext();
const allActivities = {};

function CreateNewWorkout() {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const [programName, setProgramName] = useState('');

  useEffect(() => {
    if (data.index != undefined) {
      allActivities[data.index] = {
        activityName: data.activityName,
        field1Type: data.field1Type,
        field1Value: data.field1Value,
        field2Type: data.field2Type,
        field2Value: data.field2Value,
        description: data.description,
      };
    }
  }, [data]);

  const [activities, setActivities] = useState([]);

  const addNewActivity = () => {
    setActivities(activities.concat(<NewActivity key={activities.length} index={activities.length} />));
  };

  const saveProgram = async () => {
    console.log('Saved activities ' + JSON.stringify(allActivities));
    const activityList = [];
    Object.entries(allActivities).map((activity) => {
      activityList.push({
        activityName: activity[1].activityName,
        field1Type: activity[1].field1Type,
        field1Value: activity[1].field1Value,
        field2Type: activity[1].field2Type,
        field2Value: activity[1].field2Value,
        description: activity[1].description,
      });
    });
    try {
      await addDoc(collection(db, 'programs'), {
        programName: programName,
        activities: activityList,
      });
    } catch {
      console.log('Something went wrong saving workout.');
    }
    navigate('/workouts');
  };

  return (
    <activityContext.Provider value={{ data, setData }}>
      <div className='background'>
        <h3 className='titleText'>Workout name:</h3>
        <input
          onChange={(e) => setProgramName(e.target.value)}
          className='titleChoosen'
          placeholder='Workout name'
        ></input>
        <div>
          <button onClick={addNewActivity} className='addActivity'>
            New activity +
          </button>
          <div className='activityWrapper'>{activities}</div>
        </div>
        <button onClick={saveProgram} className='addActivity'>
          Save workout
        </button>
      </div>
    </activityContext.Provider>
  );
}

export default CreateNewWorkout;

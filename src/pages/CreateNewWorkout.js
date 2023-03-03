import { createContext, useEffect, useState } from 'react';
import NewWorkout from '../components/newWorkout/NewWorkout';
import './CreateNewWorkout.scss';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const workoutContext = createContext();
const allWorkouts = {};

function CreateNewWorkout() {
  const navigate = useNavigate();

  const [data, setData] = useState({});

  const [programName, setProgramName] = useState('');

  useEffect(() => {
    if (data.index != undefined) {
      allWorkouts[data.index] = {
        workoutName: data.workoutName,
        field1Type: data.field1Type,
        field1Value: data.field1Value,
        field2Type: data.field2Type,
        field2Value: data.field2Value,
        description: data.description,
      };
    }
  }, [data]);

  const [workouts, setWorkouts] = useState([]);

  const addNewWorkout = () => {
    setWorkouts(workouts.concat(<NewWorkout key={workouts.length} index={workouts.length} />));
  };

  const saveProgram = async () => {
    console.log('Saved workouts ' + JSON.stringify(allWorkouts));
    const workoutList = [];
    Object.entries(allWorkouts).map((workout) => {
      workoutList.push({
        workoutName: workout[1].workoutName,
        field1Type: workout[1].field1Type,
        field1Value: workout[1].field1Value,
        field2Type: workout[1].field2Type,
        field2Value: workout[1].field2Value,
        description: workout[1].description,
      });
    });
    try {
      await addDoc(collection(db, 'programs'), {
        programName: programName,
        workouts: workoutList,
      });
    } catch {
      console.log('Something went wrong saving workout.');
    }
    navigate('/workouts');
  };

  return (
    <workoutContext.Provider value={{ data, setData }}>
      <div className='background'>
        <h3 className='titleText'>Workout name:</h3>
        <input
          onChange={(e) => setProgramName(e.target.value)}
          className='titleChoosen'
          placeholder='Workout name'
        ></input>
        <div>
          <button onClick={addNewWorkout} className='addWorkout'>
            New workout +
          </button>
          <div className='workoutWrapper'>{workouts}</div>
        </div>
        <button onClick={saveProgram} className='addWorkout'>
          Save program
        </button>
      </div>
    </workoutContext.Provider>
  );
}

export default CreateNewWorkout;

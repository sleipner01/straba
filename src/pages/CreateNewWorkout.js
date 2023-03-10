import { createContext, useEffect, useState } from 'react';
import NewWorkout from '../components/newWorkout/NewWorkout';
import './CreateNewWorkout.scss';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const workoutContext = createContext();
const allWorkouts = {};

function CreateNewWorkout() {
  const navigate = useNavigate();

  const [programData, setProgramData] = useState({});

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
  }, [programData]);

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
        name: programName,
        private: false,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
        workoutType: 'strength training',
        activities: workoutList,
        link: '/' + programName,
      });
    } catch {
      console.log('Something went wrong saving workout.');
    }
    navigate('/workouts');
  };

  return (
    <workoutContext.Provider value={{ workoutData, setData }}>
      <div className='background'>
        <div className='programContent'>
          <h3 className='titleText'>Program name:</h3>
          <input
            onChange={(e) => setProgramName(e.target.value)}
            className='titleChosen'
            placeholder='Program name'
          ></input>
          <div className='workoutFeed'>
            <button onClick={addNewWorkout} className='addWorkout'>
              New workout +
            </button>
            <div className='workoutWrapper'>{workouts}</div>
          </div>
          <button onClick={saveProgram} className='addWorkout'>
            Save program
          </button>
        </div>
      </div>
    </workoutContext.Provider>
  );
}

export default CreateNewWorkout;

import { createContext, useContext, useEffect, useState } from 'react';
import NewWorkout from '../components/newWorkout/NewWorkout';
import './CreateNewWorkout.scss';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

export const workoutContext = createContext();
const allWorkouts = {};

function CreateNewWorkout() {
  const navigate = useNavigate();

  const [workoutData, setWorkoutData] = useState({});

  const [programData, setProgramData] = useState({});
  const [programName, setProgramName] = useState('');

  const addNewWorkout = () => {
    setWorkouts(workouts.concat(<NewWorkout key={workouts.length} workoutIndex={workouts.length} />));
  };

  const handleUpdateProgramData = () => {
    setProgramData({
      programName: programName,
      workouts: allWorkouts,
    });
  };

  useEffect(() => {
    if (workoutData.workoutIndex != undefined) {
      allWorkouts[workoutData.workoutIndex] = {
        workoutName: workoutData.workoutName,
        activities: workoutData.activities,
      };
    }
    handleUpdateProgramData();
  }, [workoutData, programName]);

  const [workouts, setWorkouts] = useState([]);

  const saveProgram = async () => {
    console.log('Saved workouts ' + JSON.stringify(allWorkouts));
    let workoutInfo = [];
    Object.entries(allWorkouts).map((workout) => {
      let activityInfo = [];
      Object.entries(workout[1].activities).map((activity) => {
        activityInfo.push({
          activityName: activity[1].activityName,
          field1Type: activity[1].field1Type,
          field1Value: activity[1].field1Value,
          field2Type: activity[1].field2Type,
          field2Value: activity[1].field2Value,
          description: activity[1].description,
        });
      });
      workoutInfo.push({
        workoutName: workout[1].workoutName,
        activities: activityInfo,
      });
    });
    try {
      await addDoc(collection(db, 'programs'), {
        name: programName,
        private: false,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
        workoutType: 'strength training',
        workouts: workoutInfo,
        link: '/' + programName,
      });
    } catch {
      console.log('Something went wrong saving workout.');
    }
    navigate('/workouts');
  };

  return (
    <workoutContext.Provider value={{ workoutData, setWorkoutData }}>
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

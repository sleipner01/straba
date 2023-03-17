import { createContext, useEffect, useState } from 'react';
import NewWorkout from '../components/newWorkout/NewWorkout';
import './CreateNewProgram.scss';
import { auth, db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { FormControl, NativeSelect, TextField, Checkbox, FormControlLabel } from '@mui/material';

export const workoutContext = createContext();
const allWorkouts = {};

function CreateNewProgram() {
  const navigate = useNavigate();

  const [workoutData, setWorkoutData] = useState({});

  const [programData, setProgramData] = useState({});
  const [programName, setProgramName] = useState('');
  const [programVisbility, setProgramVisbility] = useState(false);
  const [programType, setProgramType] = useState('strength');
  const [programDescription, setProgramDescription] = useState('');

  const addNewWorkout = () => {
    setWorkouts(workouts.concat(<NewWorkout key={workouts.length} workoutIndex={workouts.length} />));
  };

  const handleUpdateProgramData = () => {
    setProgramData({
      programName: programName,
      programVisbility: programVisbility,
      workouts: allWorkouts,
    });
  };

  useEffect(() => {
    if (workoutData.workoutIndex !== undefined) {
      allWorkouts[workoutData.workoutIndex] = {
        workoutName: workoutData.workoutName,
        activities: workoutData.activities,
      };
    }
    handleUpdateProgramData();
  }, [workoutData, programName, programVisbility]);

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
        description: programDescription,
        private: programVisbility,
        createdAt: serverTimestamp(),
        userId: auth.currentUser.uid,
        programType: programType,
        workouts: workoutInfo,
      });
    } catch {
      alert('Something went wrong saving workout.');
    }
    navigate('/programs');
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
          <div className='programInfo'>
            <p>Program type</p>
            <FormControl sx={{ m: 1, width: '200px' }} variant='standard'>
              <NativeSelect
                id='setType'
                defaultValue='strength'
                onChange={(e) => {
                  setProgramType(e.target.value);
                }}
              >
                <option value={'strength'}>Strength training</option>
                <option value={'cardio'}>Cardio</option>
                <option value={'flexibility'}>Flexibility</option>
                <option value={'custom'}>Custom</option>
              </NativeSelect>
            </FormControl>
            <p>Visbility</p>
            <FormControlLabel
              control={
                <Checkbox
                  checked={programVisbility}
                  onChange={(e) => {
                    setProgramVisbility(e.target.checked);
                  }}
                />
              }
              label='Private'
            />
          </div>
          <div className='programInfo'>
            <p>Description</p>
            <TextField
              value={programDescription}
              inputProps={{
                sx: {
                  fontSize: '15px',
                  padding: '1px 3px',
                  marginTop: '15px',
                  width: 600,
                },
              }}
              variant='standard'
              multiline
              maxRows={5}
              onChange={(e) => setProgramDescription(e.target.value)}
            />
          </div>
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

export default CreateNewProgram;

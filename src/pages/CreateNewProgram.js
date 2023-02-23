import { useState } from 'react';
import { Button, Modal } from '@mui/material';
import NewActivity from '../components/newActivity/NewActivity';
import './CreateNewWorkout.scss';
function CreateNewProgram() {
  const [numActivities, setNumActivities] = useState(1);
  const [workouts, setWorkouts] = useState([]);
  const [open, setOpen] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [workoutIndex, setWorkoutIndex] = useState(null);
  const [activities, setActivities] = useState([]);
  const addNewActivity = () => {
    setNumActivities((prevNumActivities) => prevNumActivities + 1);
    setActivities((prevActivities) => [...prevActivities, { name: '', sets: '', reps: '' }]);
  };
  const handleAddWorkout = () => {
    setWorkoutIndex(null);
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    const newWorkout = {
      name: workoutName,
      activities: activities.map((activity) => ({
        name: activity.name,
        sets: activity.sets,
        reps: activity.reps,
      })),
    };
    if (workoutIndex !== null) {
      setWorkouts((prevWorkouts) => {
        const updatedWorkouts = [...prevWorkouts];
        updatedWorkouts[workoutIndex] = newWorkout;
        return updatedWorkouts;
      });
    } else {
      setWorkouts((prevWorkouts) => [...prevWorkouts, newWorkout]);
    }
    setWorkoutName('');
    setNumActivities(1);
    setWorkoutIndex(null);
    setActivities([]);
  };
  const handleEditWorkout = (index) => {
    setWorkoutIndex(index);
    setWorkoutName(workouts[index].name);
    setNumActivities(workouts[index].activities.length);
    setOpen(true);
    setActivities(
      workouts[index].activities.map((activity) => ({
        name: activity.name,
        sets: activity.sets,
        reps: activity.reps,
      })),
    );
  };
  const handleWorkoutNameChange = (event) => {
    setWorkoutName(event.target.value);
  };
  const handleActivityChange = (event, index, field) => {
    setActivities((prevActivities) => {
      const updatedActivities = [...prevActivities];
      const activity = updatedActivities[index];
      activity[field] = event.target.value;
      return updatedActivities;
    });
  };
  const activityElements = activities.map((activity, index) => (
    <div key={index}>
      <NewActivity
        nameValue={activity.name}
        setsValue={activity.sets}
        repsValue={activity.reps}
        onNameChange={(event) => handleActivityChange(event, index, 'name')}
        onSetsChange={(event) => handleActivityChange(event, index, 'sets')}
        onRepsChange={(event) => handleActivityChange(event, index, 'reps')}
      />
      <br />
    </div>
  ));
  return (
    <div className='background'>
      <h3 className='titleText'>Program name:</h3>
      <input className='titleChoosen' placeholder='Program name' />
      <div>
        <Button onClick={handleAddWorkout} variant='contained'>
          Add workout
        </Button>
        {workouts.map((workout, index) => (
          <div key={index}>
            <h3>{workout.name}</h3>
            <Button onClick={() => handleEditWorkout(index)}>Edit</Button>
            {workout.activities.map((activity, index) => (
              <p key={index}>
                {activity.name} - {activity.sets} x {activity.reps}
              </p>
            ))}
          </div>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)}>
        <div className='modal'>
          <h3 className='titleText'>Workout name:</h3>
          <input
            className='titleChoosen'
            placeholder='Workout name'
            value={workoutName}
            onChange={handleWorkoutNameChange}
          />
          <div>
            <Button onClick={addNewActivity} variant='contained'>
              Add activity
            </Button>
            <div className='activityWrapper'>{activityElements}</div>
          </div>
          <Button variant='contained' onClick={handleCloseModal}>
            Save workout
          </Button>
        </div>
      </Modal>
    </div>
  );
}
export default CreateNewProgram;

import NewActivity from '../components/newActivity/NewActivity';
import './CreateNewWorkout.scss';

function CreateNewWorkout() {
  const ChooseType = () => {
    // todo
  };

  return (
    <div className='background'>
      <h3 className='titleText'>Workout name:</h3>
      <input className='titleChoosen' placeholder='Workout name'></input>
      <div>
        <button onClick={ChooseType}>New activity +</button>
        <NewActivity className='activity' />
      </div>
    </div>
  );
}

export default CreateNewWorkout;

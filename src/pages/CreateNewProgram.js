import './CreateNewWorkout.scss';

function CreateNewProgram() {
  return (
    <div className='background'>
      <h3 className='titleText'>Program name:</h3>
      <input className='titleChoosen' placeholder='Program name'></input>
      <div>
        <button a href='/CreateNewWorkout'>
          <a href='/CreateNewWorkout'>New workout</a>
        </button>
      </div>
    </div>
  );
}

export default CreateNewProgram;

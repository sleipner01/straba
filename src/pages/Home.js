import { useState, useEffect } from 'react';
import './Home.scss';
import { auth } from '../firebase';
import { getFirestore, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const Home = () => {
  const [trainingCount, setTrainingCount] = useState(0);
  const [buttonClicked, setButtonClicked] = useState(false);
  const user = auth.currentUser;

  const getFirebaseData = async () => {
    const userRef = doc(collection(getFirestore(), 'users'), user.uid);
    console.log('HEnter streak');
    const docSnap = await getDoc(userRef);
    if (docSnap.exists()) {
      setTrainingCount(Number(docSnap.data().streak));
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    // Retrieve the user's streak attribute from the database
    getFirebaseData();
  });

  const updateStreakOnFirebase = async () => {
    const userRef = doc(getFirestore(), 'users', user.uid);

    console.log('updating doc');

    await updateDoc(userRef, {
      streak: trainingCount + 1,
    });
  };

  const handleYesClick = () => {
    updateStreakOnFirebase();

    const trainingCountEl = document.getElementById('training-count');
    if (trainingCountEl) {
      trainingCountEl.classList.add('celebrate');
      setTimeout(() => {
        trainingCountEl.classList.remove('celebrate');
      }, 1000);
    }
    setButtonClicked(true);
  };

  return (
    <div className='container'>
      <h2>Welcome {user.displayName}</h2>
      <h2>Have you worked out today?</h2>
      <div className={`button-container ${buttonClicked ? 'fade-out' : ''}`}>
        <button className='yes-button' onClick={handleYesClick}>
          YES
        </button>
      </div>
      <p className='training-count-text'>
        Streak:{' '}
        <span id='training-count' className='training-count'>
          {trainingCount}
        </span>
      </p>
    </div>
  );
};

export default Home;

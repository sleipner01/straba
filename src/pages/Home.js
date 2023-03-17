import { useState, useEffect } from 'react';
import './Home.scss';
import { auth } from '../firebase';
import { getFirestore, collection, doc } from 'firebase/firestore';

const Home = () => {
  const [trainingCount, setTrainingCount] = useState(10);
  const [buttonClicked, setButtonClicked] = useState(false);
  const user = auth.currentUser;

  useEffect(() => {
    // Listen for changes to the user's authentication state
    const unsubscribe = auth.onAuthStateChanged(
      (user) => {
        if (user) {
          // Retrieve the user's streak attribute from the database
          const userRef = doc(collection(getFirestore(), 'users'), user.uid);
          userRef.onSnapshot(
            (snapshot) => {
              const userData = snapshot.data();
              if (userData && userData.streak) {
                setTrainingCount(userData.streak);
              } else {
                console.error('Error: User data or streak attribute not found.');
              }
            },
            (error) => {
              console.error('Error retrieving user data:', error);
            },
          );
        } else {
          setTrainingCount(10);
        }
      },
      (error) => {
        console.error('Error listening for authentication state changes:', error);
      },
    );

    // Cleanup function
    return () => {
      unsubscribe();
    };
  }, []);

  const handleYesClick = () => {
    setTrainingCount(trainingCount + 1);
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

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { initializeApp } from 'firebase/app';
import { db, auth } from '../firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { textAlign } from '@mui/system';

const programsJson = `{
  "programs": [
    {
      "name": "Beginner's Workout Program",
      "description": "This is a beginner's workout program designed to help you get started with exercising.",
      "workoutType": "Strength training",
      "link": "/beginner-workout"
    },
    {
      "name": "Intermediate Wot Program",
      "description": "This is an intermediate workout program designed for those who have some experience with exercising.",
      "workoutType": "Cardio",
      "link": "/intermediate-workout"
    },
    {
      "name": "Advanced Workout Program",
      "description": "This is an advanced workout program designed for those who are already in good shape and want to take their fitness to the next level.",
      "workoutType": "HIIT",
      "link": "5percentnutrition.com/"
    }
  ]
}`;

function WorkoutOverview(props) {
  const [programTest, setProgramTest] = useState('Wrong');
  const [programDescription, setProgramDescription] = useState('Description pls');
  const [programType, setProgramType] = useState('Default type');
  const user = auth.currentUser;
  const userID = user.uid;
  const userRef = doc(db, 'users', userID);
  const programs = [];

  // const q = query(collection(db, 'programs'), where('userID', '==', userID));
  // alert(userID);
  let handleClick = async () => {
    setProgramTest('Waiting');
    const text = '/users/' + userID;
    // Use text if UserID is string
    // alert(text);
    const userRef = doc(db, 'users', userID);
    // alert(userRef);
    console.log(userRef);
    const q = query(collection(db, 'programs'), where('userID', '==', userRef));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot);
    console.log(querySnapshot.docs);
    if (querySnapshot.docs.length == 0) {
      alert('NOOO');
    } else {
      alert('Lenght not null');
      querySnapshot.forEach((doc) => {
        programs.push({ id: doc.id, ...doc.data() });
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        setProgramTest(doc.data().name);
        setProgramDescription(doc.data().description);
        setProgramType(doc.data().workoutType);
        console.log(programs);
      });
    }

    // try {
    //   alert('test');
    //   await getDoc(doc(db, 'programs', 'cwL9ai4RNkZjwqcGMnxg')).then((doc) => {
    //     if (doc.exists()) {
    //       setProgramTest(doc.data().name);
    //       setProgramDescription(doc.data().description);
    //       setProgramType(doc.data().workoutType);
    //       alert(doc.data().userID);
    //     } else {
    //       alert('nooo');
    //       setProgramTest('No programs found');
    //     }
    //   });
    // } catch (error) {
    //   console.error('Checking if customer exists failed" ' + error);
    //   setProgramTest('No programs found2');
    // }
  };

  const programs2 = JSON.parse(programsJson).programs;
  console.log(programs2);

  const getIconForWorkoutType = (workoutType) => {
    switch (workoutType.toLowerCase()) {
      case 'strength training':
        return <FitnessCenterIcon fontSize='150px' />;
      case 'cardio':
        return <DirectionsRunIcon fontSize='150px' />;
      case 'hiit':
        return <WhatshotIcon fontSize='150px' />;
      default:
        return null;
    }
  };

  // const TestDB = async (user) => {
  //   auth.onAuthStateChanged((user) => {
  //     if (user) {
  //       // User is signed in.
  //       // console.log(user.displayName);
  //       alert('hjafh');
  //     } else {
  //       // User is signed out.
  //       console.log('User is signed out.');
  //     }
  //   });

  // try {
  //   await getDoc(doc(db, 'programs', 'B1KYVPiHMvzzev9dJmte')).then((doc) => {
  //     if (doc.exists()) {
  //       alert(user);
  //       alert(doc.data().name);
  //       programTest = doc.data().name;
  //       setProgramTest('Correct');
  //     } else {
  //       alert('nooo');
  //     }
  //   });
  // } catch (error) {
  //   console.error('Checking if customer exists failed" ' + error);
  // }
  // };

  return (
    <div style={{ marginTop: '40px', marginLeft: '10px', position: 'absolute' }}>
      <h2 style={{ textAlign: 'center' }}>Welcome {user.displayName}</h2>
      <button onClick={handleClick}>Show your workouts</button>
      {programs.map((program, index) => (
        <Link to={program.link} key={index} style={{ textDecoration: 'none' }}>
          <Card
            sx={{
              backgroundColor: '#f5f5f5',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              marginBottom: '20px',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <CardContent>
                <Typography variant='h5' component='h2'>
                  {programTest}
                </Typography>
                <Typography color='textSecondary'>{programDescription}</Typography>
              </CardContent>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '110px' }}>
                {getIconForWorkoutType(programType)}
                {/* {getIconForWorkoutType(program.workoutType)} */}
              </div>
              <div>
                <button onClick={handleClick}>Hello My friend</button>
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default WorkoutOverview;

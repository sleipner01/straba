import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import { db } from '../firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { LoadingDots } from '../components/misc/usefulComponents';
function WorkoutOverview() {
  const [firebaseData, setFirebaseData] = useState();
  const loadProgramsFromFirestore = async () => {
    try {
      const q = query(collection(db, 'programs'), where('private', '==', false));
      await getDocs(q).then((querySnapshot) => {
        console.log(querySnapshot);
        querySnapshot.docs.map((doc) => {
          const data = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
          setFirebaseData(data);
          console.log(data);
        });
      });
    } catch (error) {
      console.error('Retrieving documents failed" ' + error);
    }
  };
  const getIconForWorkoutType = (workoutType) => {
    if (!workoutType) return <QuestionMarkIcon fontSize='150px' />;
    switch (workoutType.toLowerCase()) {
      case 'strength':
        return <FitnessCenterIcon fontSize='150px' />;
      case 'cardio':
        return <DirectionsRunIcon fontSize='150px' />;
      case 'hiit':
        return <WhatshotIcon fontSize='150px' />;
      case 'flexibility':
        return <SelfImprovementIcon fontSize='150px' />;
      default:
        return <QuestionMarkIcon fontSize='150px' />;
    }
  };
  useEffect(() => {
    loadProgramsFromFirestore();
  }, []);
  return (
    <div style={{ marginTop: '40px', marginLeft: '10px', position: 'absolute' }}>
      {!firebaseData ? (
        <LoadingDots />
      ) : (
        firebaseData.map((data, index) => (
          <Link to={`/programs/${data.id}`} key={index} style={{ textDecoration: 'none' }}>
            <Card
              sx={{
                width: '75vw',
                backgroundColor: '#F5F5F5',
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
                    {data.name}
                  </Typography>
                  <Typography color='textSecondary' sx={{ maxWidth: '55vw' }}>
                    {data.description}
                  </Typography>
                </CardContent>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '110px' }}>
                  {getIconForWorkoutType(data.programType)}
                </div>
              </div>
            </Card>
          </Link>
        ))
      )}
    </div>
  );
}
export default WorkoutOverview;

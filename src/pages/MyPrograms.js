import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { FormControlLabel, Checkbox } from '@mui/material';
import { db, auth } from '../firebase';
import { getDocs, collection, query, where, updateDoc, doc, orderBy } from 'firebase/firestore';
import { LoadingDots } from '../components/misc/usefulComponents';
import { useNavigate } from 'react-router-dom';

function MyPrograms() {
  let navigate = useNavigate();
  const goToWorkout = (data) => {
    let path = `/programs/${data.id}`;
    navigate(path);
  };

  const changeActive = async (e) => {
    console.log(e.target);
    try {
      await updateDoc(doc(db, 'programs', e.target.id), {
        active: e.target.checked,
      });
    } catch {
      alert('Something went wrong changing active state.');
    }
  };

  const user = auth.currentUser;
  const [firebaseData, setFirebaseData] = useState();
  const loadProgramsFromFirestore = async () => {
    try {
      const q = query(
        collection(db, 'programs'),
        where('userId', '==', user.uid),
        orderBy('active', 'desc'),
        orderBy('name', 'asc'),
      );
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
      case 'custom':
        return <AccessibilityNewIcon fontSize='150px' />;
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
          <Card
            key={index}
            sx={{
              backgroundColor: '#FCE181',
              width: '75vw',
              maxWidth: '75vw',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
              padding: '20px',
              marginBottom: '20px',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <CardContent onClick={() => goToWorkout(data)} sx={{ width: '75vw' }}>
                <Typography variant='h5' component='h2'>
                  {data.name}
                </Typography>
                <Typography color='textSecondary' sx={{ maxWidth: '55vw' }}>
                  {data.description}
                </Typography>
              </CardContent>
              <div style={{ display: 'flex', alignItems: 'center', fontSize: '110px' }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id={data.id}
                      defaultChecked={data.active}
                      onChange={(e) => {
                        changeActive(e);
                      }}
                    />
                  }
                  label='Active'
                />
                {getIconForWorkoutType(data.programType)}
              </div>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
export default MyPrograms;

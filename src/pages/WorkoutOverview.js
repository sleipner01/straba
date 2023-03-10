import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography } from '@mui/material';
import { FitnessCenter, DirectionsRun, SelfImprovement, AccessibilityNew } from '@mui/icons-material';
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

  const getIconForProgramType = (programType) => {
    if (!programType) return null;
    switch (programType.toLowerCase()) {
      case 'strength':
        return <FitnessCenter fontSize='150px' />;
      case 'cardio':
        return <DirectionsRun fontSize='150px' />;
      case 'flexibility':
        return <SelfImprovement fontSize='150px' />;
      case 'custom':
        return <AccessibilityNew fontSize='150px' />;
      default:
        return null;
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
          <Link to={data.link} key={index} style={{ textDecoration: 'none' }}>
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
                    {data.name}
                  </Typography>
                  <Typography color='textSecondary'>{data.description}</Typography>
                </CardContent>
                <div style={{ display: 'flex', alignItems: 'center', fontSize: '110px' }}>
                  {getIconForProgramType(data.programType)}
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

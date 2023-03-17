import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { LoadingDots } from '../components/misc/usefulComponents';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
function ProgramPage() {
  const { id } = useParams();
  const [program, setProgram] = useState(null);
  const [workouts, setWorkouts] = useState(null);
  useEffect(() => {
    const fetchProgram = async () => {
      try {
        const programDoc = await getDoc(doc(db, 'programs', id));
        if (programDoc.exists()) {
          setProgram(programDoc.data());
        }
      } catch (error) {
        console.error('Error fetching program:', error);
      }
    };
    const fetchWorkouts = async () => {
      try {
        const q = query(collection(db, 'programs'), where('programId', '==', id));
        const querySnapshot = await getDocs(q);
        const workoutsData = querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setWorkouts(workoutsData);
      } catch (error) {
        console.error('Error fetching workouts:', error);
      }
    };
    fetchProgram();
    fetchWorkouts();
  }, [id]);
  if (!program || !workouts) {
    return <LoadingDots />;
  }
  return (
    <div>
      <h1 style={{ marginLeft: '10px' }}>{program.name}</h1>
      <p style={{ marginLeft: '10px' }}>{program.description}</p>
      {console.log(program)}
      {program.workouts.map((workout) => (
        <div key={workout.workoutName}>
          <Card
            sx={{
              backgroundColor: '#F5DABE',
              borderRadius: '10px',
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
              padding: '20px',
              marginBottom: '20px',
              marginLeft: '10px',
              marginRight: '10px',
              transition: 'transform 0.2s ease-in-out',
              '&:hover': {
                transform: 'scale(1.02)',
              },
            }}
          >
            <CardContent>
              <h3>{workout.workoutName}</h3>
              <p>{workout.description}</p>
              {workout.activities.map((activities) => (
                <div key={activities.activityName}>
                  <p>
                    <strong>{activities.activityName}:</strong>
                    <br />
                    {activities.field1Type}: {activities.field1Value}
                    <br></br>
                    {activities.field2Type}: {activities.field2Value}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      ))}
    </div>
  );
}
export default ProgramPage;

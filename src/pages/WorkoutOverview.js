import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const programsJson = `{
  "programs": [
    {
      "name": "Beginner's Workout",
      "description": "This is a beginner's workout program designed to help you get started with exercising.",
      "workoutType": "Strength training",
      "link": "/beginner-workout"
    },
    {
      "name": "Intermediate Workout",
      "description": "This is an intermediate workout program designed for those who have some experience with exercising.",
      "workoutType": "Cardio",
      "link": "/intermediate-workout"
    },
    {
      "name": "Advanced Workout",
      "description": "This is an advanced workout program designed for those who are already in good shape and want to take their fitness to the next level.",
      "workoutType": "HIIT",
      "link": "5percentnutrition.com/"
    }
  ]
}`;

function WorkoutOverview() {
  const programs = JSON.parse(programsJson).programs;

  const getIconForWorkoutType = (workoutType) => {
    switch (workoutType.toLowerCase()) {
      case 'strength training':
        return <FitnessCenterIcon  fontSize='150px'/>;
      case 'cardio':
        return <DirectionsRunIcon  fontSize='150px'/>;
      case 'hiit':
        return <WhatshotIcon fontSize='150px'/>;
      default:
        return null;
    }
  };

  return (
    <div style={{ marginTop: '40px', marginLeft: '10px', position: 'absolute' }}>
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
                <Typography variant="h5" component="h2">
                  {program.name}
                </Typography>  
                <Typography color="textSecondary">
                  {program.description}
                </Typography>
              </CardContent>
              <div style={{ display: 'flex', alignItems: 'center', fontSize:'110px' }}>
                {getIconForWorkoutType(program.workoutType)}
              </div>
            </div>
          </Card>
        </Link>
      ))}
    </div>
  );
}

export default WorkoutOverview;
import * as React from 'react';
import { createContext, useEffect, useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import NewActivity from '../newActivity/NewActivity';
import { workoutContext } from '../../pages/CreateNewWorkout';
import './NewWorkout.scss';

export const activityContext = createContext();
const allActivities = {};

export default function NewWorkout({ workout }) {
  const [workoutData, setWorkoutData] = useState({});
  const [activityData, setActivityData] = useContext(activityContext);
  const [workoutName, setWorkoutName] = useState('');
  const [activities, setActivities] = useState([]);

  const addNewActivity = () => {
    setActivities(activities.concat(<NewActivity key={activities.length} index={activities.length} />));
  };

  return (
    <activityContext.Provider value={{ activityData, setActivityData }}>
      <div>
        <h3 className='titleText'>Workout name:</h3>
        <input
          onChange={(e) => setWorkoutName(e.target.value)}
          className='titleChosen'
          placeholder='Workout name'
        ></input>
        <div>
          <button onClick={addNewActivity} className='addActivity'>
            New activity +
          </button>
          <div className='activityWrapper'>{activities}</div>
        </div>
        {console.log(activities)}
      </div>
    </activityContext.Provider>
  );

  // return (
  //   <Card sx={{ maxWidth: 700, backgroundColor: '#FCE181' }}>
  //     <CardActionArea
  //       className='activityHeader'
  //       sx={{ padding: '10px', paddingLeft: '20px' }}
  //       onClick={(e) => {
  //         handleExpandClick(e);
  //       }}
  //     >
  //       <span id='workoutName'>{`${workout.name}`}</span>
  //       <ExpandMore
  //         className='expandIcon'
  //         expand={expanded}
  //         onClick={(e) => {
  //           handleExpandClick(e);
  //         }}
  //         aria-expanded={expanded}
  //         aria-label='show more'
  //       >
  //         <ExpandMoreIcon />
  //       </ExpandMore>
  //       <EditPage>
  //         <EditIcon className='editIcon'></EditIcon>
  //       </EditPage>
  //     </CardActionArea>
  //     <Collapse in={expanded} unmountOnExit>
  //       <CardContent className='expandedContent' sx={{ backgroundColor: '#FEF9C7' }}>
  //         {workout.activities.map((activity, index) => {
  //           return (
  //             <div key={index}>
  //               <span>{activity.name}</span>
  //               <span className='activitySmallInfo'>{activity.field2value}</span>
  //               <span className='activitySmallInfo'>{activity.field1value && activity.field2value ? 'x' : ''}</span>
  //               <span className='activitySmallInfo'>{activity.field1value}</span>
  //             </div>
  //           );
  //         })}
  //       </CardContent>
  //     </Collapse>
  //   </Card>
  // );
}

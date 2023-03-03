import * as React from 'react';
import { createContext, useEffect, useState } from 'react';
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

// handle style for expansion of card, gives cool tapping effect
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const EditPage = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function NewWorkout({ workout }) {
  // handle expanding card
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = (e) => {
    if (e.target.id !== 'activityName') {
      setExpanded(!expanded);
    }
  };

  const [data, setData] = useState({});
  const [programName, setProgramName] = useState('');
  const [activities, setActivities] = useState([]);

  const addNewActivity = () => {
    setActivities(activities.concat(<NewActivity key={activities.length} index={activities.length} />));
  };

  return (
    <workoutContext.Provider value={{ data, setData }}>
      <div className='background'>
        <h3 className='titleText'>Workout name:</h3>
        <input
          onChange={(e) => setProgramName(e.target.value)}
          className='titleChoosen'
          placeholder='Workout name'
        ></input>
        <div>
          <button onClick={addNewActivity} className='addActivity'>
            New activity +
          </button>
          <div className='activityWrapper'>{activities}</div>
        </div>
      </div>
    </workoutContext.Provider>
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

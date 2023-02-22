import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
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

  return (
    <Card sx={{ maxWidth: 700, backgroundColor: '#FCE181' }}>
      <CardActionArea
        className='activityHeader'
        sx={{ padding: '10px', paddingLeft: '20px' }}
        onClick={(e) => {
          handleExpandClick(e);
        }}
      >
        <span id='workoutName'>{`${workout.name}`}</span>
        <ExpandMore
          className='expandIcon'
          expand={expanded}
          onClick={(e) => {
            handleExpandClick(e);
          }}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </ExpandMore>
        <EditPage>
          <EditIcon className='editIcon'></EditIcon>
        </EditPage>
      </CardActionArea>
      <Collapse in={expanded} unmountOnExit>
        <CardContent className='expandedContent' sx={{ backgroundColor: '#FEF9C7' }}>
          {workout.activities.map((activity, index) => {
            return (
              <div key={index}>
                <span>{activity.name}</span>
                <span className='activitySmallInfo'>{activity.field2value}</span>
                <span className='activitySmallInfo'>{activity.field1value && activity.field2value ? 'x' : ''}</span>
                <span className='activitySmallInfo'>{activity.field1value}</span>
              </div>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}

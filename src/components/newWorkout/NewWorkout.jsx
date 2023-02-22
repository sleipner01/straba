import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import './NewWorkout.scss';

import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

// test data
const userObject = {
  username: 'elihaugu',
  programs: ['program1', 'program2'],
  email: 'elihaugu@stud.ntnu.no',
  fullname: 'Elin Haugum',
};

const program1 = {
  name: 'program1',
  workouts: [
    {
      name: 'workout1',
      activities: [
        {
          name: 'activity1',
          field1type: 'Reps',
          field1value: 12,
          field2type: 'Sets',
          field2value: 3,
        },
        {
          name: 'activity2',
          field1type: 'Sec',
          field1value: 30,
          description: 'Run for 30 secs',
        },
      ],
    },
    {
      name: 'workout2',
      activities: [
        {
          name: 'activity1',
          field1type: 'Secs',
          field1value: 60,
        },
      ],
    },
  ],
};

const program2 = {
  name: 'program2',
  workouts: [
    {
      name: 'workout1',
      activities: [
        {
          name: 'activity1',
          field1type: 'Secs',
          field1value: 30,
          field2type: 'Sets',
          field2value: 3,
          description: 'Do the exercise 3 times.',
        },
        {
          name: 'activity2',
          field2type: 'Sec',
          field2value: 30,
          description: 'Run for 30 secs',
        },
      ],
    },
  ],
};

const programs = [program1, program2];

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

export default function NewWorkout() {
  const regex = /^(\s*|\d+)$/;

  // handle field1 state and illegal inputs
  const [field1Value, setField1Value] = React.useState();
  const [field1Type, setField1Type] = React.useState('reps');
  const [errorField1, setErrorField1] = React.useState(false);

  const handleSetField1 = (e) => {
    // don't allow negative values or special characters
    setErrorField1(e.target.value < 0 || !regex.test(e.target.value));
    setField1Value(e.target.value);
  };

  // handle field2 state
  const [field2Value, setField2Value] = React.useState();
  const [field2Type, setField2Type] = React.useState('sets');
  const [errorField2, setErrorField2] = React.useState(false);

  const handleSetField2 = (e) => {
    // don't allow negative values or special characters
    setErrorField2(e.target.value < 0 || !regex.test(e.target.value));
    setField2Value(e.target.value);
  };

  // handle set activityInfo at top of card
  const [activityInfo, updateActivityInfo] = React.useState('');
  const handleUpdateActivityInfo = () => {
    // yes i know ugly asf if else but they don't look at the code and it was the easiest at the time
    // don't hang me just for some ugly ifs pls
    let activityInfo = '';
    if (field1Value > 0 && !errorField1) {
      activityInfo = activityInfo.concat(`${field1Value} ${field1Type}`);
    }
    if (field1Value > 0 && !errorField1 && field2Value > 0 && !errorField2) {
      activityInfo = activityInfo.concat(' x ');
    }
    if (field2Value > 0 && !errorField2) {
      activityInfo = activityInfo.concat(`${field2Value} ${field2Type}`);
    }
    updateActivityInfo(activityInfo);
  };
  // setup useEffect so activity info updates onchange to field1 and field2
  React.useEffect(() => {
    handleUpdateActivityInfo();
  }, [field1Value, field2Value, field1Type, field2Type]);

  // handle saving description
  const [description, updateDescription] = React.useState('');

  // handle expanding card
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = (e) => {
    if (e.target.id !== 'activityName') {
      setExpanded(!expanded);
    }
  };

  const string = 'wah her kommer firebase ting';

  return (
    <Card sx={{ maxWidth: 700, backgroundColor: '#FCE181' }}>
      <CardActionArea
        className='activityHeader'
        sx={{ padding: '10px', paddingLeft: '20px' }}
        onClick={(e) => {
          handleExpandClick(e);
        }}
      >
        <span id='workoutName'>{`${string}`}</span>
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
          {programs.map((program) => {
            return (
              <div>
                <p>{program.name}</p>
                {program.workouts.map((workout) => {
                  return <p>{workout.name}</p>;
                })}
              </div>
            );
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}

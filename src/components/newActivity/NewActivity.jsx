import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { TextField } from '@mui/material';
import './NewActivity.scss';

import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { fontSize } from '@mui/system';

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

export default function NewActivity() {
  const regex = /^(\s*|\d+)$/;

  // handle reps state and illegal inputs
  const [reps, setReps] = React.useState(0);
  const [errorReps, setErrorReps] = React.useState(false);

  const handleSetReps = (e) => {
    // don't allow negative values or special characters
    setErrorReps(e.target.value < 0 || !regex.test(e.target.value));
    setReps(e.target.value);
  };

  // handle sets state
  const [sets, setSets] = React.useState(0);
  const [errorSets, setErrorSets] = React.useState(false);

  const handleSetSets = (e) => {
    // don't allow negative values or special characters
    setErrorSets(e.target.value < 0 || !regex.test(e.target.value));
    setSets(e.target.value);
  };

  // handle set activityInfo at top of card
  const [activityInfo, updateActivityInfo] = React.useState('');
  const handleUpdateActivityInfo = () => {
    // yes i know ugly asf if else but they don't look at the code and it was the easiest at the time
    // don't hang me just for some ugly ifs pls
    let activityInfo = '';
    console.log(reps, sets);
    if (reps > 0 && !errorReps) {
      activityInfo = activityInfo.concat(`${reps} reps`);
      console.log(activityInfo);
    }
    if (reps > 0 && !errorReps && sets > 0 && !errorSets) {
      activityInfo = activityInfo.concat(' x ');
    }
    if (sets > 0 && !errorSets) {
      activityInfo = activityInfo.concat(`${sets} sets`);
    }
    updateActivityInfo(activityInfo);
  };
  // setup useEffect so activity info updates onchange to reps and sets
  React.useEffect(() => {
    handleUpdateActivityInfo();
  }, [reps, sets]);

  // handle expanding card
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = (e) => {
    if (e.target.id !== 'programName') {
      setExpanded(!expanded);
    }
  };

  return (
    <Card sx={{ maxWidth: 700, backgroundColor: '#FCE181' }}>
      <CardActionArea
        className='activityName'
        sx={{ padding: '10px' }}
        onClick={(e) => {
          handleExpandClick(e);
        }}
      >
        <TextField
          id='programName'
          inputProps={{
            sx: {
              padding: '1px 3px',
              fontSize: '20px',
            },
          }}
          label='Activity name'
          variant='standard'
          focused
        />
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
        <span className='activityInfoSmall'>{activityInfo}</span>
      </CardActionArea>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent className='expandedContent' sx={{ backgroundColor: '#FEF9C7' }}>
          <div className='field'>
            <span>Reps:</span>
            <TextField
              className='numberTextField'
              inputProps={{ maxLength: 5 }}
              onChange={(e) => handleSetReps(e)}
              hiddenLabel
              error={errorReps}
              value={reps}
              defaultValue={reps}
              helperText={errorReps ? 'Non-numeric characters or negative values not allowed.' : ''}
              size='small'
            />
          </div>
          <div className='field'>
            <span>Sets:</span>
            <TextField
              className='numberTextField'
              inputProps={{ maxLength: 5 }}
              onChange={(e) => handleSetSets(e)}
              hiddenLabel
              error={errorSets}
              defaultValue={sets}
              helperText={errorSets ? 'Non-numeric characters or negative values not allowed.' : ''}
              size='small'
            />
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}

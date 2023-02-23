import { useState, useContext, useEffect } from 'react';
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
import { activityContext } from '../../pages/CreateNewWorkout';

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

export default function NewActivity({ index }) {
  const { data, setData } = useContext(activityContext);

  const regex = /^(\s*|\d+)$/;

  // handle saving description
  const [description, updateDescription] = useState('');

  // handle activity name state
  const [activityName, setActivityName] = useState('');

  // handle field1 state and illegal inputs
  const [field1Value, setField1Value] = useState(0);
  const [field1Type, setField1Type] = useState('reps');
  const [errorField1, setErrorField1] = useState(false);

  const handleSetField1 = (e) => {
    // don't allow negative values or special characters
    setErrorField1(e.target.value < 0 || !regex.test(e.target.value));
    setField1Value(e.target.value);
  };

  // handle field2 state
  const [field2Value, setField2Value] = useState(0);
  const [field2Type, setField2Type] = useState('sets');
  const [errorField2, setErrorField2] = useState(false);

  const handleSetField2 = (e) => {
    // don't allow negative values or special characters
    setErrorField2(e.target.value < 0 || !regex.test(e.target.value));
    setField2Value(e.target.value);
  };

  // handle set activityInfo at top of card
  const [activityInfo, updateActivityInfo] = useState('');
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
    setData({
      index: index,
      activityName: activityName,
      field1Type: field1Type,
      field1Value: field1Value,
      field2Type: field2Type,
      field2Value: field2Value,
      description: description,
    });
  };
  // setup useEffect so activity info updates onchange to field1 and field2
  useEffect(() => {
    handleUpdateActivityInfo();
  }, [field1Value, field2Value, field1Type, field2Type, activityName, description]);

  // handle expanding card
  const [expanded, setExpanded] = useState(false);
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
        <TextField
          id='activityName'
          inputProps={{
            sx: {
              padding: '1px 3px',
              fontSize: '20px',
            },
          }}
          label='Activity name'
          variant='standard'
          required
          onChange={(e) => setActivityName(e.target.value)}
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
      <Collapse in={expanded} unmountOnExit>
        <CardContent className='expandedContent' sx={{ backgroundColor: '#FEF9C7' }}>
          <div className='field'>
            <FormControl sx={{ m: 1, width: '200px' }} variant='standard'>
              <NativeSelect
                id='setField'
                defaultValue={field1Type}
                onChange={(e) => {
                  setField1Type(e.target.value);
                }}
              >
                <option value={'reps'}>Reps</option>
                <option value={'sets'}>Sets</option>
                <option value={'sec'}>Sec</option>
                <option value={'min'}>Min</option>
                <option value={'kgs'}>Kgs</option>
                <option value={'lbs'}>Lbs</option>
              </NativeSelect>
            </FormControl>

            <TextField
              className='numberTextField'
              inputProps={{ maxLength: 5 }}
              onChange={(e) => handleSetField1(e)}
              hiddenLabel
              error={errorField1}
              value={field1Value}
              defaultValue={field1Value}
              helperText={errorField1 ? 'Non-numeric characters or negative values not allowed.' : ''}
              size='small'
            />
          </div>
          <div className='field'>
            <FormControl sx={{ m: 1, width: '200px' }} variant='standard'>
              <NativeSelect
                id='setField'
                defaultValue={field2Type}
                onChange={(e) => {
                  setField2Type(e.target.value);
                }}
              >
                <option value={'reps'}>Reps</option>
                <option value={'sets'}>Sets</option>
                <option value={'sec'}>Sec</option>
                <option value={'min'}>Min</option>
                <option value={'kgs'}>Kgs</option>
                <option value={'lbs'}>Lbs</option>
              </NativeSelect>
            </FormControl>
            <TextField
              className='numberTextField'
              inputProps={{ maxLength: 5 }}
              onChange={(e) => handleSetField2(e)}
              hiddenLabel
              error={errorField2}
              defaultValue={field2Value}
              helperText={errorField2 ? 'Non-numeric characters or negative values not allowed.' : ''}
              size='small'
            />
          </div>
          <div className='field'>
            <span>Description</span>
            <TextField
              value={description}
              inputProps={{
                sx: {
                  fontSize: '15px',
                  padding: '1px 3px',
                  marginTop: '15px',
                },
              }}
              variant='standard'
              multiline
              maxRows={5}
              onChange={(e) => updateDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}

import { useState } from 'react';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import { faker } from '@faker-js/faker';
import Økt from '../components/Økt';
import Button from '@mui/material/Button';

const WorkoutOverview = () => {
  const [items, setItems] = useState([]);

  const addRow = () => {
    setItems((items) => [...items, { name: faker.name.firstName(), description: 'get swole now!' }]);
  };

  return (
    <>
      <div>
        <Button id='Button' variant='contained' onClick={addRow}>
          New Workout!
        </Button>
      </div>
      <div id='box'>
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 4, md: 6 }}
            columnSpacing={{ xs: 6, sm: 8, md: 40 }}
            className='v-timeline-container'
            columns={24}
          >
            {items.map((item) => (
              <Grid xs={6} item className='v-timeline-item v-center v-border'>
                <Økt name={`${item.name}`} age={`${item.description}`} style={{ color: 'red' }}></Økt>
              </Grid>
            ))}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default WorkoutOverview;

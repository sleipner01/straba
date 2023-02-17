import * as React from 'react';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';

import CardContent from '@mui/material/CardContent';

import Typography from '@mui/material/Typography';

function Økt(props) {
  return (
    <>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant='h5' component='div'>
            {`${props.name}`}
          </Typography>
          <Typography variant='body2'>
            <Link overlay='true' href='https://lichess.org/'>
              {`${props.age}`}
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}

export default Økt;

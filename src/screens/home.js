import Button from '@material-ui/core/Button';
import React from 'react';
import Typography from '@material-ui/core/Typography';

import * as hooks from '../hooks';

function Home() {
  const handleRoute = hooks.useHistoryHandler();

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h4">
        Welcome to the Trivia Challenge!
      </Typography>

      <Typography gutterBottom variant="h5">
        You will be presented with 10 True or False questions.
      </Typography>

      <Typography gutterBottom variant="h5">
        Can you score 100%?
      </Typography>

      <Button color="primary" onClick={handleRoute('/quiz')} variant="contained">
        BEGIN
      </Button>
    </React.Fragment>
  );
}

export default Home;

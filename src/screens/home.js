import Button from '@material-ui/core/Button';
import React from 'react';

import * as hooks from '../hooks';

function Home() {
  const handleRoute = hooks.useHistoryHandler();

  return (
    <React.Fragment>
      <h1>Welcome to the Trivia Challenge!</h1>
      <h2>You will be presented with 10 True or False questions.</h2>
      <h2>Can you score 100%?</h2>
      <Button color="primary" onClick={handleRoute('/quiz')} variant="contained">
        BEGIN
      </Button>
    </React.Fragment>
  );
}

export default Home;

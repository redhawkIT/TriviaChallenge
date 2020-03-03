import { useHistory } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import React, { useCallback } from 'react';

function Home() {
  const history = useHistory();

  const handleClick = useCallback(() => history.push('/quiz'), [history]);

  return (
    <React.Fragment>
      <h1>Welcome to the Trivia Challenge!</h1>
      <h2>You will be presented with 10 True or False questions.</h2>
      <h2>Can you score 100%?</h2>
      <Button color="primary" onClick={handleClick} variant="contained">
        BEGIN
      </Button>
    </React.Fragment>
  );
}

export default Home;

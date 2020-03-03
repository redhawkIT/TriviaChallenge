import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';
import Typography from '@material-ui/core/Typography';

import QuestionSelection from './QuestionSelection';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
}));

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  const classes = useStyles();

  return (
    <Grid className={classes.root} container spacing={2}>
      <Grid item xs={12}>
        <Card className={classes.root}>{children}</Card>
      </Grid>
    </Grid>
  );
}

function LoadingSkeleton() {
  return (
    <Layout>
      <CardContent>
        {Array(6)
          .fill()
          .map((e, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <Skeleton key={index} animation="wave" height={60} />
          ))}
      </CardContent>
    </Layout>
  );
}

function Question({ triva = {}, count = 0, total = 0, next, back }) {
  const { question, category, type, correct_answer, incorrect_answers } = triva;

  if (!Object.keys(triva).length) {
    return <LoadingSkeleton />;
  }

  return (
    <Layout>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {`Question #${count}`}
        </Typography>

        <Typography color="textSecondary" gutterBottom>
          {`Category: ${category}`}
        </Typography>

        <Typography color="textSecondary">{question}</Typography>
      </CardContent>

      <QuestionSelection
        correct_answer={correct_answer}
        incorrect_answers={incorrect_answers}
        type={type}
      />
      <CardActions>
        {count !== 1 && (
          <Button onClick={back} size="small">
            Back
          </Button>
        )}

        {count !== total && (
          <Button onClick={next} size="small">
            Next
          </Button>
        )}

        {count === total && (
          <Button onClick={next} size="small">
            Submit
          </Button>
        )}
      </CardActions>
    </Layout>
  );
}

Question.propTypes = {
  // TODO: Add triva shape
  triva: PropTypes.object,
  count: PropTypes.number.isRequired,
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
  total: PropTypes.number.isRequired,
};

export default Question;

import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import React from 'react';
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

function Question({ next, back }) {
  const trivia = useSelector(state => state.trivia);
  const quiz = useSelector(state => state.quiz);

  if (!Object.keys(trivia).length || !trivia.questions.length) {
    return <LoadingSkeleton />;
  }

  const count = quiz.index + 1;
  const { question, category } = trivia.questions[quiz.index];
  const noAnswer = !quiz.selectedAnswers[question];

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

      <QuestionSelection />
      <CardActions>
        {count !== 1 && (
          <Button onClick={back} size="small">
            Back
          </Button>
        )}

        {count !== trivia.total && (
          <Button disabled={noAnswer} onClick={next} size="small">
            Next
          </Button>
        )}

        {count === trivia.total && (
          <Button disabled={noAnswer} onClick={next} size="small">
            Submit
          </Button>
        )}
      </CardActions>
    </Layout>
  );
}

Question.propTypes = {
  next: PropTypes.func.isRequired,
  back: PropTypes.func.isRequired,
};

export default Question;

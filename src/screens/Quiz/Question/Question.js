import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';

import * as quizActions from '../../../redux/reducers/quiz';
import Card from '../../../components/Card';
import LoadingSkeleton from './LoadingSkeleton';
import QuestionSelection from './QuestionSelection';
import QuestionsFinished from './QuestionsFinished';

const useStyles = makeStyles(() => ({
  actions: {
    float: 'right',
  },
}));

function Question({ handleNext, handleBack, refetchQuestions }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const trivia = useSelector(state => state.trivia);
  const quiz = useSelector(state => state.quiz);

  const handleSubmit = useCallback(() => dispatch(quizActions.submit()), [dispatch]);

  if (trivia.loading) {
    return <LoadingSkeleton />;
  }

  if (quiz.finished) {
    return <QuestionsFinished refetchQuestions={refetchQuestions} />;
  }

  const count = quiz.index + 1;
  const { question, category } = trivia.questions[quiz.index];
  const noAnswer = !quiz.selectedAnswers[question];

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {`Question #${count}`}
        </Typography>

        <Typography color="textSecondary" gutterBottom>
          {`Category: ${category}`}
        </Typography>

        <Typography color="textSecondary">{question}</Typography>

        <QuestionSelection />
      </CardContent>

      <CardActions className={classes.actions}>
        {count !== 1 && (
          <Button onClick={handleBack} size="small">
            Back
          </Button>
        )}

        {count !== trivia.total && (
          <Button disabled={noAnswer} onClick={handleNext} size="small">
            Next
          </Button>
        )}

        {count === trivia.total && (
          <Button disabled={noAnswer} onClick={handleSubmit} size="small">
            Submit
          </Button>
        )}
      </CardActions>
    </Card>
  );
}

Question.propTypes = {
  handleNext: PropTypes.func.isRequired,
  handleBack: PropTypes.func.isRequired,
  refetchQuestions: PropTypes.func.isRequired,
};

export default Question;

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';

import * as hooks from '../../../hooks';
import * as quizActions from '../../../redux/reducers/quiz';
import * as utils from '../../../utils';
import Card from '../../../components/Card';

const useStyles = makeStyles(() => ({
  actions: {
    float: 'right',
  },
}));

function QuestionsFinished({ refetchQuestions }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const handleRoute = hooks.useHistoryHandler();
  const trivia = useSelector(state => state.trivia);
  const quiz = useSelector(state => state.quiz);
  const resultText = useMemo(() => utils.getResultsText({ quiz, trivia }), [quiz, trivia]);

  const handleStartNewQuiz = useCallback(() => {
    dispatch(quizActions.reset());
    refetchQuestions();
  }, [dispatch, refetchQuestions]);

  return (
    <Card>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          Quiz Completed
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {resultText}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button onClick={handleStartNewQuiz} size="small">
          New Quiz
        </Button>
        <Button onClick={handleRoute('/results')} size="small">
          View Results
        </Button>
      </CardActions>
    </Card>
  );
}

QuestionsFinished.propTypes = {
  refetchQuestions: PropTypes.func.isRequired,
};

export default QuestionsFinished;

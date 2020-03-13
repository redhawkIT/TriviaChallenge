import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';

import * as hooks from '../../hooks';
import * as quizActions from '../../redux/reducers/quiz';
import * as utils from '../../utils';
import QuestionResult from './QuestionResult';

function Results({ fetchNewQuestions }) {
  const handleRoute = hooks.useHistoryHandler();
  const trivia = useSelector(state => state.trivia);
  const quiz = useSelector(state => state.quiz);
  const dispatch = useDispatch();
  const resultText = useMemo(() => utils.getResultsText({ quiz, trivia }), [quiz, trivia]);

  const handleNewQuiz = useCallback(() => {
    fetchNewQuestions();
    dispatch(quizActions.reset());
    handleRoute('/quiz')();
  }, [dispatch, fetchNewQuestions, handleRoute]);

  if (!quiz.finished) {
    return (
      <React.Fragment>
        <Typography gutterBottom variant="h4">
          No Results
        </Typography>
        <Typography gutterBottom variant="h5">
          Complete a quiz and come back!
        </Typography>
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h4">
        Results
      </Typography>

      <Typography gutterBottom variant="h5">
        {resultText}
      </Typography>

      {trivia.questions.map((q, index) => (
        <QuestionResult key={q.question} index={index} />
      ))}

      <br />

      <Button color="primary" fullWidth onClick={handleNewQuiz} size="large" variant="outlined">
        Play again?
      </Button>
    </React.Fragment>
  );
}

Results.propTypes = {
  fetchNewQuestions: PropTypes.func.isRequired,
};

export default Results;

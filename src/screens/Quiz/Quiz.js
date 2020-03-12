import { useDispatch, useSelector } from 'react-redux';
import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';

import * as quizActions from '../../redux/reducers/quiz';
import Question from './Question';

function Quiz() {
  const dispatch = useDispatch();
  const quiz = useSelector(state => state.quiz);
  const trivia = useSelector(state => state.trivia);

  const count = quiz.index + 1;

  // TODO: Make next back button on the left and right of the quiz
  const handleNext = useCallback(() => dispatch(quizActions.next()), [dispatch]);
  const handleBack = useCallback(() => dispatch(quizActions.back()), [dispatch]);

  if (trivia.error) {
    return <h1>Somthing went wrong...</h1>;
  }

  return (
    <React.Fragment>
      <Typography gutterBottom variant="h4">
        Quiz
      </Typography>

      <Typography gutterBottom variant="h5">
        {`Question ${count} of ${trivia.total}`}
      </Typography>

      <Question
        handleBack={handleBack}
        handleNext={handleNext}
        refetchQuestions={trivia.refetchQuestions}
      />
    </React.Fragment>
  );
}

export default Quiz;

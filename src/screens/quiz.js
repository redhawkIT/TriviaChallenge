import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';

import * as hooks from '../hooks';
import * as quizActions from '../redux/reducers/quiz';
import Question from '../components/Question';

function Quiz({ amount = 10 }) {
  const dispatch = useDispatch();
  const trivia = hooks.useTriviaAPI({ amount });
  const quiz = useSelector(state => state.quiz);

  const count = quiz.index + 1;

  const next = useCallback(() => dispatch(quizActions.next()), [dispatch]);
  const back = useCallback(() => dispatch(quizActions.back()), [dispatch]);

  if (trivia.error) {
    return <h1>Somthing went wrong...</h1>;
  }

  return (
    <React.Fragment>
      <h1>QUIZ</h1>
      <h3>{`Questions ${count} of ${trivia.total}`}</h3>
      <Question back={back} next={next} />
    </React.Fragment>
  );
}

Quiz.propTypes = {
  amount: PropTypes.number,
};

export default Quiz;

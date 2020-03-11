import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import React, { useCallback } from 'react';
import Typography from '@material-ui/core/Typography';

import * as hooks from '../../../hooks';
import * as quizActions from '../../../redux/reducers/quiz';
import Card from '../../../components/Card';
import LoadingSkeleton from './LoadingSkeleton';
import QuestionSelection from './QuestionSelection';

const getResultsText = ({ trivia = {}, quiz = {} }) => {
  const checkAnswer = q => quiz.selectedAnswers[q.question] === q.correct_answer;
  const correctCount = trivia.questions.filter(checkAnswer).length;
  return `${correctCount} of ${trivia.questions.length} correct`;
};

function Question({ handleNext, handleBack, refetchQuestions }) {
  const dispatch = useDispatch();
  const handleRoute = hooks.useHistoryHandler();
  const trivia = useSelector(state => state.trivia);
  const quiz = useSelector(state => state.quiz);

  const handleSubmit = useCallback(() => dispatch(quizActions.submit()), [dispatch]);
  const handleStartNewQuiz = useCallback(() => {
    dispatch(quizActions.reset());
    refetchQuestions();
  }, [dispatch, refetchQuestions]);

  if (trivia.loading) {
    return <LoadingSkeleton />;
  }

  if (quiz.finished) {
    const resultText = getResultsText({ quiz, trivia });
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
        <CardActions>
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
      </CardContent>

      <QuestionSelection />
      <CardActions>
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

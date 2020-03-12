import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo } from 'react';
import Typography from '@material-ui/core/Typography';

import * as quizActions from '../../../redux/reducers/quiz';
import Card from '../../../components/Card';
import LoadingSkeleton from './LoadingSkeleton';
import QuestionSelection from './QuestionSelection';
import QuestionsFinished from './QuestionsFinished';
import QuizOptions from './QuizOptions';

const useStyles = makeStyles(() => ({
  actions: {
    float: 'right',
  },
}));

const deriveData = ({ trivia = {}, quiz = {} }) => {
  let question = '';
  let category = '';
  let noAnswer = true;

  if (trivia.questions && trivia.questions.length) {
    const triviaItem = trivia.questions[quiz.index];
    question = triviaItem.question;
    noAnswer = !quiz.selectedAnswers[question];
    category = triviaItem.category;
  }

  return {
    question,
    category,
    noAnswer,
  };
};

function Question({ handleNext, handleBack, refetchQuestions }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const trivia = useSelector(state => state.trivia);
  const quiz = useSelector(state => state.quiz);
  const { question, category, noAnswer } = useMemo(() => deriveData({ trivia, quiz }), [
    trivia,
    quiz,
  ]);

  const handleSubmit = useCallback(() => dispatch(quizActions.submit()), [dispatch]);

  const count = quiz.index + 1;

  if (trivia.loading) {
    return <LoadingSkeleton />;
  }

  if (quiz.finished) {
    return <QuestionsFinished refetchQuestions={refetchQuestions} />;
  }

  return (
    <Card>
      <CardContent>
        <QuizOptions />

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

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import React, { useCallback } from 'react';

import * as quizActions from '../../../redux/reducers/quiz';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

function QuestionSelection() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const trivia = useSelector(state => state.trivia);
  const quiz = useSelector(state => state.quiz);

  const { correct_answer, incorrect_answers, question } = trivia.questions[quiz.index];
  const selectedAnswer = quiz.selectedAnswers[question];
  const answers = incorrect_answers.concat(correct_answer);

  const handleChange = useCallback(
    event =>
      dispatch(
        quizActions.selectAnswer({
          question,
          answer: event.target.value,
        })
      ),
    [dispatch, question]
  );

  return (
    <FormControl className={classes.formControl} component="fieldset">
      <FormLabel component="legend">Select one</FormLabel>
      <FormGroup>
        {answers.map(answer => (
          <FormControlLabel
            key={answer}
            control={
              <Checkbox
                checked={selectedAnswer === answer}
                onChange={handleChange}
                value={answer}
              />
            }
            label={answer}
          />
        ))}
      </FormGroup>
    </FormControl>
  );
}

export default QuestionSelection;

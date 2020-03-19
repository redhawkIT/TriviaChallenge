import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import React, { useCallback, useState } from 'react';

import * as quizActions from '../../../redux/reducers/quiz';

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(3),
  },
}));

function QuestionSelection() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const trivia = useSelector(state => state.trivia);
  const quiz = useSelector(state => state.quiz);
  const [disabled, setDisabled] = useState(false);

  const { correct_answer, incorrect_answers, question } = trivia.questions[quiz.index];
  const selectedAnswer = quiz.selectedAnswers[question];
  const answers = incorrect_answers.concat(correct_answer);

  const handleChange = useCallback(
    event => {
      // Prevent double clicks, since quizActions.next is async
      if (!disabled) {
        setDisabled(true);
        dispatch(
          quizActions.selectAnswer({
            question,
            answer: event.target.value,
          })
        );

        // Last quiz would submit, prevent out of index
        if (trivia.questions.length - 1 !== quiz.index) {
          setTimeout(() => {
            setDisabled(false);
            dispatch(quizActions.next());
          }, 250);
        } else {
          setDisabled(false);
        }
      }
    },
    [dispatch, question, quiz.index, trivia.questions.length, disabled]
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

import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import PropTypes from 'prop-types';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

import Card from '../../components/Card';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(3),
  },
}));

const useLabelStyles = makeStyles(() => ({
  correct: {
    color: green[800],
    fontWeight: 600,
  },
  incorrect: {
    color: red[800],
    fontWeight: 600,
  },
}));

// eslint-disable-next-line react/prop-types
const Label = ({ answer, correct_answer, userAnswer }) => {
  const classes = useLabelStyles();

  if (correct_answer === answer) {
    return (
      <Typography className={classes.correct} color="textPrimary">
        {answer}
      </Typography>
    );
  }

  if (userAnswer === answer) {
    return (
      <Typography className={classes.incorrect} color="textPrimary">
        {answer}
      </Typography>
    );
  }

  return answer;
};

function QuestionResult({ index = 0 }) {
  const classes = useStyles();
  const trivia = useSelector(state => state.trivia);
  const quiz = useSelector(state => state.quiz);

  const { correct_answer, incorrect_answers, question, category } = trivia.questions[index];
  const userAnswer = quiz.selectedAnswers[question];
  const answers = incorrect_answers.concat(correct_answer);

  return (
    <Card spacing={4}>
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {`Question #${index + 1} (${userAnswer === correct_answer ? 'Correct' : 'Wrong'})`}
        </Typography>

        <Typography color="textSecondary" gutterBottom>
          {`Category: ${category}`}
        </Typography>

        <Typography color="textSecondary">{question}</Typography>

        <FormControl className={classes.formControl} component="fieldset">
          <FormGroup>
            {answers.map(answer => (
              <FormControlLabel
                key={answer}
                control={
                  <Checkbox checked={userAnswer === answer} disabled disableRipple value={answer} />
                }
                label={
                  <Label answer={answer} correct_answer={correct_answer} userAnswer={userAnswer} />
                }
              />
            ))}
          </FormGroup>
        </FormControl>
      </CardContent>
    </Card>
  );
}

QuestionResult.propTypes = {
  index: PropTypes.number.isRequired,
};

export default QuestionResult;

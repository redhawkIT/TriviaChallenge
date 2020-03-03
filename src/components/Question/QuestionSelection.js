import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function QuestionSelection({ correct_answer = '', incorrect_answers = [], type = '' }) {
  const classes = useStyles();
  const [checked, setChecked] = useState('');

  const answers = incorrect_answers.concat(correct_answer);

  const handleChange = useCallback(event => setChecked(event.target.value), []);

  if (type === 'multiple' || type === 'boolean') {
    return (
      <FormControl className={classes.formControl} component="fieldset">
        <FormLabel component="legend">Select one</FormLabel>
        <FormGroup>
          {answers.map(answer => (
            <FormControlLabel
              key={answer}
              control={
                <Checkbox checked={checked === answer} onChange={handleChange} value={answer} />
              }
              label={answer}
            />
          ))}
        </FormGroup>
      </FormControl>
    );
  }

  console.error(`Unknown Type: ${type}`);
  return null;
}

QuestionSelection.propTypes = {
  correct_answer: PropTypes.string.isRequired,
  incorrect_answers: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
};

export default QuestionSelection;

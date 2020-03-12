import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useCallback, useEffect, useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';

import * as quizActions from '../../../redux/reducers/quiz';
import SelectOption from './SelectOption';

const useStyles = makeStyles(() => ({
  actions: {
    float: 'right',
  },
}));

const menuItems = {
  difficulty: [
    { name: 'Easy', value: 'easy' },
    { name: 'Medium', value: 'medium' },
    { name: 'Hard', value: 'hard' },
  ],
  type: [
    { name: 'Mutiple Choice', value: 'multiple' },
    { name: 'True / False', value: 'boolean' },
  ],
};

function QuizOptions() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const quiz = useSelector(state => state.quiz);
  const { categories = [] } = useSelector(state => state.trivia);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState({ amount: 10, category: '', difficulty: '', type: '' });

  /**
   * Update local options
   */
  useEffect(() => {
    setOptions(quiz.options);
  }, [quiz.options]);

  const handleClickOpen = useCallback(() => {
    setOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSave = useCallback(() => {
    setOpen(false);
    dispatch(quizActions.setOptions(options));
  }, [dispatch, options]);

  const handleAmountChange = useCallback(event => {
    const { value } = event.target;
    let amount = value;
    if (value && value < 1) {
      amount = 1;
    }
    if (value > 100) {
      amount = 100;
    }
    setOptions(prevState => ({ ...prevState, amount }));
  }, []);

  const handleSelect = useCallback(
    name => event => {
      setOptions(prevState => ({ ...prevState, [name]: event.target.value }));
    },
    []
  );

  return (
    <React.Fragment>
      <Tooltip onClick={handleClickOpen} title="Quiz Options">
        <IconButton className={classes.actions}>
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Quiz Options</DialogTitle>
        <DialogContent>
          <DialogContentText>Create a new quiz</DialogContentText>
          <TextField
            autoFocus
            fullWidth
            label="Number of Questions"
            onChange={handleAmountChange}
            type="number"
            value={options.amount}
            variant="outlined"
          />
          <SelectOption
            handleSelect={handleSelect('category')}
            helperText=""
            label="Select Category"
            menuItems={categories}
            name="category"
            setOptions={setOptions}
            value={options.category}
          />
          <SelectOption
            handleSelect={handleSelect('difficulty')}
            helperText=""
            label="Select Difficulty"
            menuItems={menuItems.difficulty}
            name="difficulty"
            setOptions={setOptions}
            value={options.difficulty}
          />
          <SelectOption
            handleSelect={handleSelect('type')}
            helperText=""
            label="Select Type"
            menuItems={menuItems.type}
            name="type"
            setOptions={setOptions}
            value={options.type}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default QuizOptions;

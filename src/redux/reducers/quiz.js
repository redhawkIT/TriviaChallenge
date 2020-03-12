import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  index: 0,
  selectedAnswers: {
    // [question]: answer
  },
  finished: false,
  options: {
    amount: 10,
    category: '',
    difficulty: '',
    type: '',
  },
};

// Automatically generates action creators and action types that correspond to the reducers and state.
// createSlice wraps your function with produce from the Immer library.
const slice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    next(state) {
      state.index += 1;
    },
    back(state) {
      state.index -= 1;
    },
    selectAnswer(state, action) {
      state.selectedAnswers[action.payload.question] = action.payload.answer;
    },
    submit(state) {
      state.finished = true;
    },
    setOptions(state, action) {
      state.options = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const { next, back, selectAnswer, submit, reset, setOptions } = slice.actions;

export default slice.reducer;

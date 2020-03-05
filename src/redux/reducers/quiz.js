import { createSlice } from '@reduxjs/toolkit';

// Automatically generates action creators and action types that correspond to the reducers and state.
// createSlice wraps your function with produce from the Immer library.
const slice = createSlice({
  name: 'quiz',
  initialState: {
    index: 0,
    selectedAnswers: {
      // [question]: answer
    },
  },
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
  },
});

export const { next, back, selectAnswer } = slice.actions;

export default slice.reducer;

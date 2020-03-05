import { createSlice } from '@reduxjs/toolkit';

// Code 0: Success Returned results successfully.
// Code 1: No Results Could not return results. The API doesn't have enough questions for your query. (Ex. Asking for 50 Questions in a Category that only has 20.)
// Code 2: Invalid Parameter Contains an invalid parameter. Arguements passed in aren't valid. (Ex. Amount = Five)
// Code 3: Token Not Found Session Token does not exist.
// Code 4: Token Empty Session Token has returned all possible questions for the specified query. Resetting the Token is necessary.
const codes = {
  sucess: 0,
  noResults: 1,
  invalid: 2,
  noSessionFound: 3,
  noQuestionsLeft: 4,
};

/**
 * Replace esacped html chars
 * @param {*} str
 */
function parse(str) {
  str = str.replace(/&amp;/g, '&');
  str = str.replace(/&gt;/g, '>');
  str = str.replace(/&lt;/g, '<');
  str = str.replace(/&quot;/g, '"');
  str = str.replace(/&#039;/g, `'`);
  return str;
}

// Automatically generates action creators and action types that correspond to the reducers and state.
// createSlice wraps your function with produce from the Immer library.
const slice = createSlice({
  name: 'trivia',
  initialState: {
    categories: [],
    questions: [],
    total: 0,
    seenAll: false,
    error: '',
  },
  reducers: {
    fetchQuerySucess(state, action) {
      if (action.payload.response_code === codes.sucess) {
        state.seenAll = false;
        state.questions = action.payload.results.map(result => {
          result.question = parse(result.question);
          result.correct_answer = parse(result.correct_answer);
          result.incorrect_answers = result.incorrect_answers.map(parse);
          return result;
        });
        state.total = action.payload.results.length;
      } else if (action.payload.response_code === codes.noQuestionsLeft) {
        state.seenAll = true;
        state.questions = [];
        state.total = 0;
      } else {
        state.seenAll = false;
        state.questions = [];
        state.total = 0;
      }
    },
    fetchQueryFailure(state, action) {
      state.error = action.payload;
    },
    fetchTokenSucess(state, action) {
      state.error = action.payload;
    },
    fetchTokenFailure(state, action) {
      state.error = action.payload;
    },
  },
});

export const {
  fetchQuerySucess,
  fetchQueryFailure,
  fetchTokenSucess,
  fetchTokenFailure,
} = slice.actions;

export default slice.reducer;

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

const initialState = {
  categories: [
    /* {name: '', value: '' } */
  ],
  questions: [],
  total: 0,
  seenAll: false,
  loading: true,
  error: '',
};

// https://stackoverflow.com/questions/1147359/how-to-decode-html-entities-using-jquery
function decodeEntities(encodedString) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = encodedString;
  return textArea.value;
}

// Automatically generates action creators and action types that correspond to the reducers and state.
// createSlice wraps your function with produce from the Immer library.
const slice = createSlice({
  name: 'trivia',
  initialState,
  reducers: {
    fetchRequest(state) {
      state.loading = true;
    },
    fetchCategoriesSucess(state, action) {
      state.categories = action.payload.map(item => ({ name: item.name, value: String(item.id) }));
    },
    fetchQuerySucess(state, action) {
      if (action.payload.response_code === codes.sucess) {
        state.seenAll = false;
        state.loading = false;
        state.questions = action.payload.results.map(result => {
          result.question = decodeEntities(result.question);
          result.correct_answer = decodeEntities(result.correct_answer);
          result.incorrect_answers = result.incorrect_answers.map(decodeEntities);
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
    fetchTokenSucess(state) {
      state.error = '';
      state.loading = false;
    },
    fetchFailure(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  fetchQuerySucess,
  fetchTokenSucess,
  fetchFailure,
  fetchRequest,
  fetchCategoriesSucess,
} = slice.actions;

export default slice.reducer;

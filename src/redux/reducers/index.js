import { configureStore } from '@reduxjs/toolkit';

import quiz from './quiz';
import trivia from './trivia';

const reducer = {
  trivia,
  quiz,
};

// The store now has redux-thunk added and the Redux DevTools Extension is turned on
const store = configureStore({
  reducer,
  // The Redux DevTools Extension is disabled for production
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;

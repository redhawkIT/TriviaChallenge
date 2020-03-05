// When making API request use the token
// DOCS https://opentdb.com/api_config.php

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import * as trivaActions from '../redux/reducers/trivia';
import useLocalStorage from './useLocalStorage';

const codes = {
  sucess: 0,
  noResults: 1,
  invalid: 2,
  noSessionFound: 3,
  noQuestionsLeft: 4,
};

async function fetchAsync(url = '') {
  const response = await fetch(url);
  return response.json();
}

/**
 * A opentdb API hook, simplifies the API
 * Handles tokens, local storage, queries, and errors
 * Only 1 Category can be requested per API Call. To get questions from any category, don't specify a category.
 * A Maximum of 50 Questions can be retrieved per call.
 * https://opentdb.com/api_config.php
 * @param type
 * @returns {array} [ results = [], seenAll = false,  error = '' ]
 * TODO:
 * Global Question Count Lookup: Show how many questions a user has completed
 * Reset token when user finished
 */
function useTriviaAPI({ type = '', difficulty = '', amount = 1, category = '' }) {
  const dispatch = useDispatch();
  const trivia = useSelector(state => state.trivia);

  // Session Tokens will be deleted after 6 hours of inactivity.
  const [token, setToken] = useLocalStorage('__opentdbToken');

  /**
   * Fetch query or token, don't setState if not mounted
   */
  useEffect(() => {
    /**
     * Query the opentdb API, using
     */
    async function fetchQuery() {
      let query = `amount=${amount}`;
      if (type) {
        query += `&type=${type}`;
      }
      if (difficulty) {
        query += `&difficulty=${difficulty}`;
      }
      if (category) {
        query += `&category=${category}`;
      }
      if (token) {
        query += `&token=${token}`;
      }

      try {
        const res = await fetchAsync(`https://opentdb.com/api.php?${query}`);
        dispatch(trivaActions.fetchQuerySucess(res));
        if ([codes.invalid, codes.noSessionFound].includes(res.response_code)) {
          fetchToken();
        }
      } catch (err) {
        console.error(err);
        dispatch(trivaActions.fetchQueryFailure(err));
      }
    }

    /**
     * Fetch token and save to local storage
     */
    async function fetchToken() {
      try {
        const res = await fetchAsync(`https://opentdb.com/api_token.php?command=request`);
        setToken(res.token);
      } catch (err) {
        console.error(err);
        dispatch(trivaActions.fetchTokenFailure(err));
      }
    }

    // Check if there is a token in local storage
    if (token) {
      // If a user changes screens we want to keep their orginal questions
      if (!trivia.total) {
        fetchQuery();
      }
    } else {
      fetchToken();
    }
  }, [
    token,
    amount,
    category,
    difficulty,
    type,
    setToken,
    trivia.questions,
    trivia.total,
    dispatch,
  ]);

  return trivia;
}

export default useTriviaAPI;

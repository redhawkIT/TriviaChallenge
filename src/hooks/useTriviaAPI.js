// When making API request use the token
// DOCS https://opentdb.com/api_config.php

import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
 */
function useTriviaAPI({ type = '', difficulty = '', amount = 1, category = '' }) {
  const dispatch = useDispatch();
  const trivia = useSelector(state => state.trivia);
  // Session Tokens will be deleted after 6 hours of inactivity.
  const [token, setToken] = useLocalStorage('__opentdbToken');

  /**
   * Fetch token and save to local storage
   */
  const fetchToken = useCallback(async () => {
    try {
      dispatch(trivaActions.fetchRequest());
      const res = await fetchAsync(`https://opentdb.com/api_token.php?command=request`);
      setToken(res.token);
    } catch (err) {
      console.error(err);
      dispatch(trivaActions.fetchTokenFailure(err));
    }
  }, [dispatch, setToken]);

  /**
   * Query the opentdb API
   */
  const fetchQuery = useCallback(async () => {
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
      dispatch(trivaActions.fetchRequest());
      const res = await fetchAsync(`https://opentdb.com/api.php?${query}`);
      dispatch(trivaActions.fetchQuerySucess(res));
      // Fetch token if token is invalid or session not found
      if ([codes.invalid, codes.noSessionFound].includes(res.response_code)) {
        fetchToken();
      }
    } catch (err) {
      console.error(err);
      dispatch(trivaActions.fetchQueryFailure(err));
    }
  }, [amount, category, difficulty, dispatch, fetchToken, token, type]);

  /**
   * Fetch query or token, don't setState if not mounted
   */
  useEffect(() => {
    // Check if there is a token in local storage
    if (token) {
      // If a user changes screens we want to keep their orginal questions
      if (!trivia.total) {
        fetchQuery();
      }
    } else {
      fetchToken();
    }
  }, [token, trivia.total, fetchQuery, fetchToken]);

  return {
    ...trivia,
    refetchQuestions: fetchQuery,
  };
}

export default useTriviaAPI;

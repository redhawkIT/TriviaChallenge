// When making API request use the token
// DOCS https://opentdb.com/api_config.php

import { useEffect, useState } from 'react';

import useLocalStorage from './useLocalStorage';

async function fetchAsync(url = '') {
  const response = await fetch(url);
  return response.json();
}

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
  // Session Tokens will be deleted after 6 hours of inactivity.
  const [token, setToken] = useLocalStorage('__opentdbToken');
  const [error, setError] = useState('');
  const [results, setResults] = useState([]);
  const [seenAll, setSeenAll] = useState(false);

  /**
   * Fetch query or token, don't setState if not mounted
   */
  useEffect(() => {
    let mounted = true;

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
        if (mounted) {
          if (res.response_code === codes.sucess) {
            setSeenAll(false);
            setResults(res.results);
          } else if (res.response_code === codes.noQuestionsLeft) {
            setSeenAll(true);
            setResults([]);
          } else if ([codes.invalid, codes.noSessionFound].includes(res.response_code)) {
            fetchToken();
            setResults([]);
            setSeenAll(false);
          } else {
            setResults([]);
            setSeenAll(false);
          }
        }
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }

    /**
     * Fetch token and save to local storage
     */
    async function fetchToken() {
      try {
        const res = await fetchAsync(`https://opentdb.com/api_token.php?command=request`);
        if (mounted) {
          setToken(res.token);
        }
      } catch (err) {
        console.error(err);
        setError(err);
      }
    }

    // Check if there is a token in local storage
    if (token) {
      fetchQuery();
    } else {
      fetchToken();
    }

    return function onUnmount() {
      mounted = false;
    };
  }, [token, amount, category, difficulty, type, setToken]);

  return [results, seenAll, error];
}

export default useTriviaAPI;

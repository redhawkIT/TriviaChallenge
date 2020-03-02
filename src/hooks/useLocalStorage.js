import { useCallback, useState } from 'react';

/**
 * @param key - Unique key for localStorage
 * @param initialValue
 * @returns [storedValue, setValue, error]
 */
function useLocalStorage(key = '', initialValue) {
  const [error, setError] = useState(null);

  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (err) {
      setError(err);
      console.error(err);
      return initialValue;
    }
  });

  const setValue = useCallback(
    value => {
      try {
        // Allow value to be a function so we have same API as useState
        const valueToStore = value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);

        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (err) {
        setError(err);
        console.error(err);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue, error];
}

export default useLocalStorage;

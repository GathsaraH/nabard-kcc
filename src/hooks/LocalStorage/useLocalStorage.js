import { useState } from 'react';

const useLocalStorage = (key, initialValue) => {
  // Get the initial value from localStorage if it exists
  const storedValue = typeof window !== 'undefined' ? localStorage.getItem(key) : null;
  const initial = storedValue ? JSON.parse(storedValue) : initialValue;

  // Create state to hold the current value
  const [value, setValue] = useState(initial);

  // Function to update the value in state and localStorage
  const setStoredValue = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  // Function to clear the value from state and localStorage
  const clearStoredValue = () => {
    setValue(initialValue);
    localStorage.removeItem(key);
  };

  return [value, setStoredValue, clearStoredValue];
};

export default useLocalStorage;

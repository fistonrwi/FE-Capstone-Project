// src/context/ThemeContext.js

import React, { createContext, useState } from 'react';

// Create a ThemeContext
const ThemeContext = createContext();

// Create a ThemeProvider component that will wrap your application
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle theme mode
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

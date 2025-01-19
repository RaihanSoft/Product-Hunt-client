import { createContext, useContext, useEffect, useState } from 'react';

// Create a Context for Dark Mode
const DarkModeContext = createContext();

// Provider Component for Dark Mode
// eslint-disable-next-line react/prop-types
export const DarkModeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('theme') === 'dark'
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

// Custom Hook to Use Dark Mode Context
export const useDarkMode = () => useContext(DarkModeContext);

// Toggle Component
const DarkModeToggle = () => {
  const { darkMode, setDarkMode } = useDarkMode();

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="p-2 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-full transition duration-300"
    >
      {darkMode ? '☀ Light' : '🌙 Dark'}
    </button>
  );
};

export default DarkModeToggle;

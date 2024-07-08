import React from 'react';
import LoginButton from './LoginButton';
import { useTheme } from '../context/ThemeContext';

const AppBar = () => {
  const { toggleTheme, theme } = useTheme();

  return (
    <div className={`p-2 flex justify-between items-center ${theme === 'dark' ? 'bg-gray-800' : 'bg-gradient-to-b from-cyan-50 to-cyan-200'}`}>
        <button onClick={toggleTheme} className="p-2 bg-gray-500 text-white rounded">
          Toggle Theme
        </button>
        <LoginButton />
      </div>
   
  );
};

export default AppBar;

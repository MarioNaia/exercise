import { useState } from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const toggle = () => {
    setIsDarkTheme((prev) => !prev);
    toggleTheme(); // Toggle theme 
  };

  return (
    <button
      onClick={toggle}
      className={`p-2 ${
        isDarkTheme ? "bg-gray-800 text-white" : "bg-gray-200 text-black"
      } rounded-md`}
    >
      {isDarkTheme ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggle;

"use client";

import Button from "@elements/Button";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { ThemeProvider, useTheme } from "../context/ThemeContext";

const HomePage = () => {
  const { theme } = useTheme();
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';

  return (
    <ThemeProvider>
      <div>
        <div className="flex flex-col justify-center items-center h-screen">
          <h1 className={`text-5xl font-bold mb-6 ${textColor}`}>
            Stock Tracker 1.0
          </h1>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default HomePage;

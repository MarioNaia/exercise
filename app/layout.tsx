"use client";

import "styles/globals.css";
import { ReactNode } from "react";
import AppBar from "./AppBar";
import Providers from "./Providers";
import { useTheme } from "../context/ThemeContext";

interface IProps {
  children: ReactNode;
}


export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppBar />
          <div className="min-h-screen">

            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}

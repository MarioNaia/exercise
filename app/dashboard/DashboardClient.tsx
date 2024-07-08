// app/dashboard/DashboardClient.tsx
"use client";

import useStockData from '../../hooks/useStockData';
import D3Chart from '../../components/StockChart';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { StockData } from '../../types/types';
import { useTheme } from '../../context/ThemeContext';

type DashboardClientProps = {
  initialData: StockData[];
};

const DashboardClient: React.FC<DashboardClientProps> = ({ initialData }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [symbol, setSymbol] = useState("AAPL");
  const [currentSymbol, setCurrentSymbol] = useState("AAPL");
  const data = useStockData(currentSymbol, 1000, initialData);

  const { theme, toggleTheme } = useTheme();
  const textColor = theme === 'dark' ? 'text-white' : 'text-black';

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  const handleButtonClick = () => {
    setCurrentSymbol(symbol);
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className={`flex flex-col justify-center items-center min-h-screen bg-gradient-to-br p-4 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
      <h1 className={`text-3xl mb-6 ${textColor}`}>Dashboard</h1>
      <div className="flex mb-6 w-full max-w-md">
        <input
          type="text"
          value={symbol}
          onChange={(e) => setSymbol(e.target.value)}
          className="p-2 border border-gray-300 rounded-l w-full"
          style={{ color: 'black' }}
          placeholder="Enter stock symbol"
        />
        <button
          onClick={handleButtonClick}
          className="p-2 bg-blue-500 text-white rounded-r"
        >
          Get Stock Data
        </button>
      </div>
      <div className="w-full max-w-full overflow-x-auto">
        {data ? <D3Chart data={data} /> : <p>No data available</p>}
      </div>
    </div>
  );
};

export default DashboardClient;

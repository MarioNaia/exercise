import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "DSFSD32SADSSA"; // Replace with your Alpha Vantage API key

interface StockData {
  date: string;
  price: number;
}

interface ApiResponse {
  'Time Series (Daily)': {
    [date: string]: {
      '4. close': string;
    };
  };
}

const generateRandomData = (numItems: number): StockData[] => {
  const randomData: StockData[] = [];
  for (let i = 0; i < numItems; i++) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    randomData.push({
      date: date.toISOString().split('T')[0],
      price: parseFloat((Math.random() * 100).toFixed(2)),
    });
  }
  return randomData.reverse();
};

const useStockData = (symbol: string, numItems: number, initialData: StockData[] = []) => {
  const [data, setData] = useState<StockData[]>(initialData);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<ApiResponse>(
          `https://www.alphavantage.co/query`,
          {
            params: {
              function: 'TIME_SERIES_DAILY',
              symbol: symbol,
              apikey: API_KEY,
              outputsize: 'compact',
            }
          }
        );

        const timeSeries = response.data["Time Series (Daily)"];
        if (!timeSeries) {
          throw new Error("Invalid API response");
        }

        const stockData = Object.keys(timeSeries)
          .slice(0, numItems)
          .map(date => ({
            date,
            price: parseFloat(timeSeries[date]["4. close"])
          }))
          .reverse();

        setData(stockData);
      } catch (error) {
        console.error("Error fetching stock data:", error);
        setData(generateRandomData(numItems));
      }
    };

    fetchData();
  }, [symbol, numItems]);

  return data;
};

export default useStockData;

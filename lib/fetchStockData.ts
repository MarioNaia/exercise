import axios from "axios";

const API_KEY = "J2HU72Z9PFG1KKXM"; 

export interface StockData {
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

export const fetchStockData = async (symbol: string, numItems: number): Promise<StockData[]> => {
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

    return stockData;
  } catch (error) {
    console.error("Error fetching stock data:", error);
    return generateRandomData(numItems);
  }
};

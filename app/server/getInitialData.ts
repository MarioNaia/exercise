import axios from "axios";

type StockData = {
  date: string;
  price: number;
};

export async function getInitialData(symbol: string, numItems: number): Promise<StockData[]> {
  const API_KEY = "ASDASD";

  let initialData: StockData[] = [];
  try {
    const response = await axios.get(`https://www.alphavantage.co/query`, {
      params: {
        function: 'TIME_SERIES_DAILY',
        symbol: symbol,
        apikey: API_KEY,
        outputsize: 'compact',
      }
    });

    const timeSeries = response.data["Time Series (Daily)"];
    if (timeSeries) {
      initialData = Object.keys(timeSeries)
        .slice(0, numItems)
        .map(date => ({
          date,
          price: parseFloat(timeSeries[date]["4. close"])
        }))
        .reverse();
    }
  } catch (error) {
    console.error("Error fetching stock data:", error);
    initialData = generateRandomData(numItems); // Fallback data
  }

  return initialData;
}

function generateRandomData(numItems: number): StockData[] {
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
}

import type { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { symbol } = req.query;
  const response = await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=J2HU72Z9PFG1KKXM&outputsize=compact`
  );
  const data = await response.json();

  const stockData = Object.keys(data["Time Series (Daily)"])
    .slice(0, 1000)
    .map(date => ({
      date,
      price: parseFloat(data["Time Series (Daily)"][date]["4. close"])
    }))
    .reverse();

  res.status(200).json(stockData);
};

export default handler;

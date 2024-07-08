import { fetchStockData } from '../../lib/fetchStockData';
import DashboardClient from './DashboardClient';
import { StockData } from '../../types/types';

export const dynamic = 'force-dynamic'; // dynamically rendered

const DashboardPage = async () => {
  const initialData: StockData[] = await fetchStockData('AAPL', 1000);

  return <DashboardClient initialData={initialData} />;
};

export default DashboardPage;

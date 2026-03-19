import { useEffect, useState } from 'react';
import {
  getTodayEstimates,
  getTodayRevenue,
  getTopZips,
  getMonthEstimates,
  getMonthRevenue,
  getYearEstimates,
  getYearRevenue,
  calculateTotalEstimateValue,
  formatCurrency
} from '@/app/_helpers/main';
import SVG from '@/app/_libs/svg';

const EstimatesDashboard = ({ estimates = [], dispatch, changeView, isDarkMode, setSelectedItem }) => {
  const [todayEstimates, setTodayEstimates] = useState(0);
  const [todayRevenue, setTodayRevenue] = useState(0);
  const [todayTopZips, setTodayTopZips] = useState([]);
  const [monthEstimates, setMonthEstimates] = useState(0);
  const [monthRevenue, setMonthRevenue] = useState(0);
  const [monthTopZips, setMonthTopZips] = useState([]);
  const [yearEstimates, setYearEstimates] = useState(0);
  const [yearRevenue, setYearRevenue] = useState(0);
  const [yearTopZips, setYearTopZips] = useState([]);
  const [allTimeRevenue, setAllTimeRevenue] = useState(0);

  useEffect(() => {
    if (estimates.length > 0) {

      setTodayEstimates(getTodayEstimates(estimates));
      setTodayRevenue(getTodayRevenue(estimates));
      setTodayTopZips(getTopZips(estimates, 'today', 5));

      setMonthEstimates(getMonthEstimates(estimates));
      setMonthRevenue(getMonthRevenue(estimates));
      setMonthTopZips(getTopZips(estimates, 'month', 5));

      setYearEstimates(getYearEstimates(estimates));
      setYearRevenue(getYearRevenue(estimates));
      setYearTopZips(getTopZips(estimates, 'year', 5));
      
      setAllTimeRevenue(calculateTotalEstimateValue(estimates));
    }
  }, [estimates]);

  const Card = ({ title, value, isCurrency, items }) => (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col items-center justify-center text-center">
      <h3 className="font-bold text-lg text-gray-700 mb-2">{title}</h3>
      {items ? (
        <div className="flex flex-col gap-1">
          {items.map((item, idx) => (
            <span key={idx} className="text-blue-600 font-semibold">{item}</span>
          ))}
        </div>
      ) : (
        <span className="text-blue-600 font-bold text-2xl">
          {isCurrency 
            ? `$${Number(value || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}` 
            : Number(value || 0).toLocaleString()
          }
        </span>
      )}
    </div>
  );

  return (
    <div className="px-10 py-10 max-lg:px-4">
      <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl mb-8">
        <div onClick={() => dispatch(changeView('dashboard'))} className="flex items-center gap-x-3 mb-4 text-black dark:text-white hover:cursor-pointer">
          <SVG svg="arrowBack" alt="Back" width={25} height={25} schemeOne={isDarkMode ? 'white' : 'black'} />
          <h5>Back</h5>
        </div>
        <h1 className="text-3xl font-bold text-black dark:text-white mb-6">Estimates Overview</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 mb-10">
          <Card title="All Time Users" value={estimates.length} />
          <Card title="All Time $ Estimates" value={allTimeRevenue} isCurrency />
          <Card title="Today's Estimates" value={todayEstimates.length} />
          <Card title="Today's Top Zips" items={todayTopZips} />
          <Card title="Today's $ Total" value={todayRevenue} isCurrency />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-black dark:text-white">Current Month</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Card title="Estimates" value={monthEstimates.length} />
              <Card title="Top Zips" items={monthTopZips} />
              <Card title="Total $" value={monthRevenue} isCurrency />
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <h2 className="text-2xl font-bold text-black dark:text-white">Current Year</h2>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <Card title="Estimates" value={yearEstimates.length} />
              <Card title="Top Zips" items={yearTopZips} />
              <Card title="Total $" value={yearRevenue} isCurrency />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EstimatesDashboard;

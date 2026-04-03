'use client'
import { useEffect, useState } from 'react';
import { convertIsoStringToDate } from '@/app/_helpers/main';
import SVG from '@/app/_libs/svg';
import EstimatesDashboard from '@/app/_components/estimateDashboard';
import { useMutation } from '@apollo/client';
import { useCookies } from 'react-cookie';
import RESET_ALL_ESTIMATES from '@/app/_mutations/resetAllEstimates';

const headerKeyMap = [
  { label: '#', key: 'index', width: 'min-w-[50px]' },
  { label: 'Date', key: 'createdAt', width: 'min-w-[100px]' },
  { label: 'Street Address', key: 'clientPropertyAddress', width: 'min-w-[200px]' },
  { label: 'City', key: 'parsedCity', width: 'min-w-[120px]' },
  { label: 'State', key: 'parsedState', width: 'min-w-[80px]' },
  { label: 'Zip Code', key: 'clientZipCode', width: 'min-w-[100px]' },
  { label: 'Interior $', key: 'interiorEstimate', width: 'min-w-[120px]' },
  { label: 'Cabinet $', key: 'cabinetEstimate', width: 'min-w-[120px]' },
  { label: 'Exterior $', key: 'exteriorEstimate', width: 'min-w-[120px]' },
  { label: 'Total $', key: 'totalPrice', width: 'min-w-[120px]' },
  { label: 'Paint Brand', key: 'paintBrand', width: 'min-w-[100px]' },
  { label: 'User', key: 'user', width: 'min-w-[140px]' },
  { label: 'Question 1', key: 'where', width: 'min-w-[100px]' },
  { label: 'Question 2', key: 'why', width: 'min-w-[100px]' },
  { label: 'Email Address', key: 'clientEmail', width: 'min-w-[200px]' },
];

const US_STATES = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
  'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'MA', 'MD',
  'ME', 'MI', 'MN', 'MO', 'MS', 'MT', 'NC', 'ND', 'NE', 'NH',
  'NJ', 'NM', 'NV', 'NY', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
  'SD', 'TN', 'TX', 'UT', 'VA', 'VT', 'WA', 'WI', 'WV', 'WY'
];

const parseCityState = (address = '') => {
  if (!address) return { city: '', state: '' };
  const tokens = address.split(',').map(t => t.trim());
  const stateZipToken = tokens.find(t => /\d{5}$/.test(t));
  const street = tokens[0] || '';
  let city = '', state = '';
  if (stateZipToken) {
    const parts = stateZipToken.split(' ');
    const possibleState = parts[0].toUpperCase();
    state = US_STATES.includes(possibleState) ? possibleState : possibleState.slice(0, 2);
  }
  city = tokens[tokens.length - 2] || '';
  return { city: city.trim(), state: state.trim() };
};

const Estimates = ({ estimates = [], dispatch, changeView, changePopup, isDarkMode, setSelectedItem, user }) => {
  const [allEstimates, setAllEstimates] = useState([]);
  const [isDescending, setIsDescending] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const estimatesPerPage = 50;
  const [resetAllEstimates, { loading: resetting, error: resetError }] = useMutation(RESET_ALL_ESTIMATES);
  const [cookies] = useCookies(['token']);
  const [resetMessage, setResetMessage] = useState('');

  const handleResetEstimates = async () => {
    setResetMessage('');
    try {
      const { data } = await resetAllEstimates({ variables: { token: cookies.token || '' } });
      setAllEstimates([]);
      setCurrentPage(1);
      setResetMessage(data.resetAllEstimates.message || 'All estimates have been reset.');
    } catch (err) {
      setResetMessage(err.message || 'Failed to reset estimates.');
    }
  };

  useEffect(() => {
    if (estimates.length > 0) {
      const enriched = estimates.map((e, idx) => {
        const { city, state } = parseCityState(e.clientPropertyAddress);
        const totalPrice =
          (parseFloat(e.interiorEstimate) || 0) +
          (parseFloat(e.cabinetEstimate) || 0) +
          (parseFloat(e.exteriorEstimate) || 0);
        // const userEmail = user?.clients?.includes(e.id) ? user.email : e.clientEmail;

        return {
          ...e,
          index: idx + 1,
          parsedCity: city,
          parsedState: state,
          totalPrice: totalPrice.toFixed(2),
          user: e.userType ? e.userType : '',
        };
      });

      const sorted = enriched.sort((a, b) =>
        isDescending
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setAllEstimates(sorted);
      setCurrentPage(1);
    }
  }, [estimates, isDescending, user]);

  const indexOfLastEstimate = currentPage * estimatesPerPage;
  const indexOfFirstEstimate = indexOfLastEstimate - estimatesPerPage;
  const currentEstimates = allEstimates.slice(indexOfFirstEstimate, indexOfLastEstimate);

  return (
    <div className="px-[80px] py-10 max-lg:px-5 max-sm:px-2">
      <div className="bg-gray-100 dark:bg-gray-800 p-5 rounded-2xl">
        <div
          onClick={() => dispatch(changeView('dashboard'))}
          className="flex items-center gap-x-3 mb-4 text-black dark:text-white hover:cursor-pointer"
        >
          <SVG svg="arrowBack" alt="Back" width={25} height={25} schemeOne={isDarkMode ? 'white' : 'black'} />
          <h5>Back</h5>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold text-black dark:text-white">Estimates</h1>
          <div className="flex gap-2">
            <button onClick={() => setIsDescending(!isDescending)} className="bg-color-1 px-4 py-2 text-white rounded-lg">
              {isDescending ? 'Sort: Oldest to Newest' : 'Sort: Newest to Oldest'}
            </button>
            <button
              onClick={handleResetEstimates}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 text-white rounded-lg transition"
              disabled={resetting}
              title="Delete all estimates permanently"
            >
              {resetting ? 'Resetting...' : 'Reset All Estimates'}
            </button>
          </div>
        </div>
        {resetMessage && (
          <div className={`mb-4 text-center ${resetError ? 'text-red-500' : 'text-green-600'}`}>{resetMessage}</div>
        )}

        <EstimatesDashboard estimates={allEstimates} />

        <div className="overflow-x-auto shadow-xl rounded-xl">
          <table className="min-w-[1000px] w-full table-auto">
            <thead>
              <tr className="bg-color-1 text-white text-sm">
                <th className="px-4 py-3 text-left min-w-[100px]">Action</th>
                {headerKeyMap.map(({ label, key, width }, idx) => (
                  <th key={idx} className={`px-4 py-3 text-left ${width} truncate capitalize`} title={label}>
                    <span className="block truncate">{label}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentEstimates.map((estimate, index) => (
                <tr key={index} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setSelectedItem(estimate);
                        dispatch(changeView('estimate'));
                      }}
                      className="hover:underline text-blue-600 dark:text-blue-400"
                    >
                      View
                    </button>
                  </td>
                  {headerKeyMap.map(({ key }, idx) => (
                    <td
                      key={idx}
                      className={`px-4 py-3 text-sm text-gray-800 dark:text-white ${
                        key === 'clientPropertyAddress'
                          ? 'min-w-[200px] whitespace-normal break-words'
                          : 'max-w-[180px] truncate'
                      }`}
                    >
                      <span title={key !== 'clientPropertyAddress' ? String(estimate[key] ?? '') : undefined}>
                        {key.toLowerCase().includes('date') || key === 'createdAt'
                          ? convertIsoStringToDate(estimate[key])
                          : String(estimate[key] ?? '')}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-center items-center my-6 gap-4">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-color-1 text-white rounded disabled:opacity-50"
            >
              Previous
            </button>
            <span className="text-black dark:text-white">
              Page {currentPage} of {Math.ceil(allEstimates.length / estimatesPerPage)}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(allEstimates.length / estimatesPerPage)))}
              disabled={currentPage === Math.ceil(allEstimates.length / estimatesPerPage)}
              className="px-4 py-2 bg-color-1 text-white rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Estimates;

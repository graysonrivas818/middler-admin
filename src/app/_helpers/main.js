function parseNumber(value) {
  return parseFloat(value.replace(/,/g, ''));
}

export const validateEmail = (email) => {
  // Simple email regex pattern
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const convertIsoStringToDate = (isoString) => {
  const date = new Date(isoString);

  // Create a DateTimeFormat object for Los Angeles time
  const options = {
    timeZone: 'America/Los_Angeles',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  };

  const formatter = new Intl.DateTimeFormat('en-US', options);
  const parts = formatter.formatToParts(date);

  // Extract the parts and construct the desired format
  const month = parts.find(part => part.type === 'month').value;
  const day = parts.find(part => part.type === 'day').value;
  const year = parts.find(part => part.type === 'year').value;

  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate

}

export const dateToday = () => {
  const now = new Date();

  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based, so add 1
  const day = String(now.getDate()).padStart(2, '0');
  const year = now.getFullYear();

  const formattedDate = `${month}/${day}/${year}`;

  return formattedDate
}

export const totalEstimate = (estimate) => {

  if(!+estimate.interiorEstimate && !+estimate.cabinetEstimate && !+estimate.exteriorEstimate) return '0'

  let total = 0

  total = +estimate.interiorEstimate + +estimate.cabinetEstimate + +estimate.exteriorEstimate

  return total.toFixed(2)
  
}

export const totalEstimateAdjusted = (estimate) => {

  let total = 0

  total = parseNumber(estimate.adjustments[estimate.adjustments.length - 1].interiorAdjusted) +
  parseNumber(estimate.adjustments[estimate.adjustments.length - 1].cabinetAdjusted) +
  parseNumber(estimate.adjustments[estimate.adjustments.length - 1].exteriorAdjusted)

  return total.toFixed(0)
  
}

// Helper to parse ISO date to Date object
export const parseDate = (isoDate) => new Date(isoDate);

// Helper to format number with commas
export const formatNumber = (num) => {
  if (isNaN(num)) return '0';
  return Number(num).toLocaleString();
};

// Helper to get today's estimates
export const getTodayEstimates = (estimates) => {
  const today = new Date();
  return estimates.filter((estimate) => {
    const created = parseDate(estimate.createdAt);
    return (
      created.getDate() === today.getDate() &&
      created.getMonth() === today.getMonth() &&
      created.getFullYear() === today.getFullYear()
    );
  });
};

// Helper to get this month's estimates
export const getMonthEstimates = (estimates) => {
  const today = new Date();
  return estimates.filter((estimate) => {
    const created = parseDate(estimate.createdAt);
    return (
      created.getMonth() === today.getMonth() &&
      created.getFullYear() === today.getFullYear()
    );
  });
};

// Helper to get this year's estimates
export const getYearEstimates = (estimates) => {
  const today = new Date();
  return estimates.filter((estimate) => {
    const created = parseDate(estimate.createdAt);
    return created.getFullYear() === today.getFullYear();
  });
};

// Helper to calculate total estimate value
export const calculateTotalEstimateValue = (estimates, returnAsNumber = false) => {
  let total = 0;

  estimates.forEach((estimate) => {
    const interior = +estimate.interiorEstimate || 0;
    const cabinet = +estimate.cabinetEstimate || 0;
    const exterior = +estimate.exteriorEstimate || 0;

    total += interior + cabinet + exterior;
  });

  return returnAsNumber ? +total.toFixed(2) : total.toFixed(2);
};

// Helper to calculate top zip codes
export const getTopZips = (estimates, timeframe = 'all', topN = 5) => {
  const zipCounts = {};
  const today = new Date();
  
  estimates.forEach((estimate) => {
    const createdAt = new Date(estimate.createdAt);
    
    if (timeframe === 'today') {
      if (
        createdAt.getDate() !== today.getDate() ||
        createdAt.getMonth() !== today.getMonth() ||
        createdAt.getFullYear() !== today.getFullYear()
      ) {
        return; // skip not today
      }
    }

    if (timeframe === 'month') {
      if (
        createdAt.getMonth() !== today.getMonth() ||
        createdAt.getFullYear() !== today.getFullYear()
      ) {
        return; // skip not this month
      }
    }

    if (timeframe === 'year') {
      if (createdAt.getFullYear() !== today.getFullYear()) {
        return; // skip not this year
      }
    }

    const zip = estimate.clientZipCode;
    if (zip) {
      zipCounts[zip] = (zipCounts[zip] || 0) + 1;
    }
  });

  return Object.entries(zipCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, topN)
    .map(([zip]) => zip);
};


// Helper to get total number of estimates
export const getTotalEstimates = (estimates) => estimates.length;

// Helper to calculate all-time revenue
export const getAllTimeRevenue = (estimates) => {
  return calculateTotalEstimateValue(estimates);
};

// Helper to calculate today revenue
export const getTodayRevenue = (estimates) => {
  const todayEstimates = getTodayEstimates(estimates);
  return calculateTotalEstimateValue(todayEstimates);
};

// Helper to calculate month revenue
export const getMonthRevenue = (estimates) => {
  const monthEstimates = getMonthEstimates(estimates);
  return calculateTotalEstimateValue(monthEstimates);
};

// Helper to calculate year revenue
export const getYearRevenue = (estimates) => {
  const yearEstimates = getYearEstimates(estimates);
  return calculateTotalEstimateValue(yearEstimates);
};

const formatNumberStats = (num) => {
  return Number(num || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};


export const formatCurrency = (num) => {
  const amount = Number(num || 0);
  return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

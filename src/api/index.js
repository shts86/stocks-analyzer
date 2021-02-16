export const getStockData = (stockCode) => {
  // apple - AAPL
  return fetch(
    `https://api.twelvedata.com/time_series?symbol=${stockCode}&outputsize=2000&interval=30min&order=ASC&apikey=55e371945e7d48dbbc110c4182e326b0`
  ).then((res) => res.json());
};

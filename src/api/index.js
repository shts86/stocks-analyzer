import moment from 'moment';

export const getStockData = (stockCode, force) => {
  // apple - AAPL
  const todayNewYork = moment().format('YYYY-MM-DD');
  const lsName = `${stockCode}_${todayNewYork}`;
  const lsData = localStorage.getItem(lsName);

  if (lsData && !force) {
    return new Promise(resolve => resolve(JSON.parse(lsData)));
  }

  return fetch(
    `https://api.twelvedata.com/time_series?symbol=${stockCode}&outputsize=2000&interval=30min&order=ASC&apikey=55e371945e7d48dbbc110c4182e326b0`
  ).then(res => {
    const promise = res.json();
    promise.then(data => localStorage.setItem(lsName, JSON.stringify(data)));
    return promise;
  });
};

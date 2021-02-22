import moment from 'moment';
import _ from 'lodash';
import { compress, decompress } from 'lz-string';

import { stocksAvailable } from '../utils/stocksAvailable';

export const getAvailableStocks = () => stocksAvailable;

export const getStockData = (stockCode, force) => {
  // apple - AAPL
  const today = moment().format('YYYY-MM-DD');
  const lsName = `stock_${stockCode}_${today}`;
  const lsData = decompress(localStorage.getItem(lsName));
  const oldLsName = Object.entries(localStorage)
    .map(item => item[0])
    .find(item => item.includes(stockCode));
  const OldDay = oldLsName?.split('_')[2];
  if (oldLsName && OldDay && OldDay !== today) {
    localStorage.removeItem(oldLsName);
  }

  if (lsData && !force) {
    return new Promise(resolve => resolve(JSON.parse(lsData)));
  }

  return fetch(
    `https://api.twelvedata.com/time_series?symbol=${stockCode}&outputsize=2000&interval=30min&order=ASC&apikey=55e371945e7d48dbbc110c4182e326b0`
  ).then(res => {
    const promise = res.json();
    promise.then(data =>
      localStorage.setItem(lsName, compress(JSON.stringify(data)))
    );
    return promise;
  });
};

export const getAllStocksData = () => {
  return _(Object.entries(localStorage))
    .filter(stock => stock[0].includes('stock_'))
    .map(item => [item[0], JSON.parse(decompress(item[1]))])
    .value();
};

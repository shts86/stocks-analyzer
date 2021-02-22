import React, { useState, useEffect } from 'react';

import Summery from '../components/common/Summary';
import { groupByDay, analyzeStockData } from '../utils';
import { getAllStocksData, getAvailableStocks } from '../api';

const StocksList = ({ checkPoint }) => {
  const stocksAvailable = getAvailableStocks();
  const [stockList, setStockList] = useState([]);

  useEffect(() => {
    const allStockData = getAllStocksData();
    const allSavedStocks = allStockData.map(item => {
      const stockData = item[1];
      const byDate = groupByDay(stockData.values);
      const stockCode = stockData.meta.symbol;
      const analyzedStock = analyzeStockData(byDate, checkPoint);
      return {
        stockCode,
        stockData: analyzedStock,
      };
    });
    setStockList(allSavedStocks);
  }, [checkPoint]);

  return (
    <>
      <h2>Stock List</h2>
      {stockList.map(stock => (
        <Summery
          key={stock.stockCode}
          data={stock.stockData}
          title={stocksAvailable[stock.stockCode]}
          stockCode={stock.stockCode}
        />
      ))}
    </>
  );
};

export default StocksList;

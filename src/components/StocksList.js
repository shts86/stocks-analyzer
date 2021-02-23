import React, { useState, useEffect, Fragment } from 'react';
import _ from 'lodash';

import Summery from '../components/common/Summary';
import { groupByDay, analyzeStockData } from '../utils';
import { getAllStocksData, getAvailableStocks } from '../api';

const StocksList = ({ checkPoint }) => {
  const stocksAvailable = getAvailableStocks();
  const [stockList, setStockList] = useState([]);
  const [listSummary, setListSummary] = useState([]);

  useEffect(() => {
    const allStockData = getAllStocksData();
    const allSavedStocks = allStockData.map(item => {
      const stockData = item[1];
      const lastUpdate = item[0].split('_')[2];
      const byDate = groupByDay(stockData.values);
      const stockCode = stockData.meta.symbol;
      const analyzedStock = analyzeStockData(byDate, checkPoint);
      return {
        stockCode,
        stockData: analyzedStock,
        lastUpdate,
      };
    });
    setStockList(allSavedStocks);
  }, [checkPoint]);

  useEffect(() => {
    const summary = _.reduce(
      stockList,
      (final, item) => {
        return [...final, ...item.stockData];
      },
      []
    );

    setListSummary(summary);
  }, [stockList]);

  return (
    <>
      <h2>Stocks List</h2>
      <Summery data={listSummary} title='All' />
      <hr></hr>
      <br></br>
      {stockList.map(stock => (
        <Fragment key={stock.stockCode}>
          <Summery
            data={stock.stockData}
            title={stocksAvailable[stock.stockCode]}
            stockCode={stock.stockCode}
            lastUpdate={stock.lastUpdate}
          />
          <hr></hr>
        </Fragment>
      ))}
    </>
  );
};

export default StocksList;

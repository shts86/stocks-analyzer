import React, { useState, useEffect, Fragment } from 'react';
import _ from 'lodash';

import Summery from '../components/common/Summary';
import { groupByDay, analyzeStockData } from '../utils';
import { getAllStocksData, getAvailableStocks, getStockData } from '../api';

const loadAllStocks = checkPoint => {
  const allStockData = getAllStocksData();
  return _(allStockData)
    .map(item => {
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
    })
    .sortBy(['stockCode'])
    .value();
};

const StocksList = ({ checkPoint }) => {
  const stocksAvailable = getAvailableStocks();
  const [stockList, setStockList] = useState([]);
  const [listSummary, setListSummary] = useState([]);
  const [isLoadingObj, setIsLoadingObj] = useState({});
  const [emptyStockData, setEmptyStockData] = useState([]);

  useEffect(() => {
    const allSavedStocks = loadAllStocks(checkPoint);
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

    const hasDataStocks = _.map(stockList, stock => stock.stockCode);
    const emptyStocks = _(stocksAvailable)
      .map((value, key) => key)
      .filter(stockCode => !_.includes(hasDataStocks, stockCode))
      .sort()
      .value();

    setListSummary(summary);
    setEmptyStockData(emptyStocks);
  }, [stockList, stocksAvailable]);

  const handleUpdateStock = stockCode => {
    const newIsLoading = { ...isLoadingObj, [stockCode]: true };
    setIsLoadingObj(newIsLoading);
    getStockData(stockCode).then(() => {
      const newIsLoading = { ...isLoadingObj, [stockCode]: false };
      setIsLoadingObj(newIsLoading);
      const allSavedStocks = loadAllStocks(checkPoint);
      setStockList(allSavedStocks);
    });
  };

  return (
    <>
      <h2>Stocks List</h2>
      <Summery data={listSummary} showMatchAnyway={true} title='All' />
      <hr></hr>
      <br></br>
      {stockList.map(stock => (
        <Fragment key={stock.stockCode}>
          <Summery
            data={stock.stockData}
            title={stocksAvailable[stock.stockCode]}
            stockCode={stock.stockCode}
            lastUpdate={stock.lastUpdate}
            handleUpdate={handleUpdateStock}
            isLoading={isLoadingObj[stock.stockCode]}
          />
          <hr></hr>
        </Fragment>
      ))}
      {emptyStockData.map(_stockCode => (
        <Fragment key={_stockCode}>
          <Summery
            title={stocksAvailable[_stockCode]}
            stockCode={_stockCode}
            handleUpdate={handleUpdateStock}
            isLoading={isLoadingObj[_stockCode]}
          />
          <hr></hr>
        </Fragment>
      ))}
    </>
  );
};

export default StocksList;

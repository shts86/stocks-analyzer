import React, { useState, useEffect } from 'react';

import { groupByDay, analyzeStockData } from '../utils';
import { getStockData } from '../api';
import StockPageView from './StockPageView';

// 9am to  4pm trade

const StockPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [dataByDay, setDataByDay] = useState([]);
  const [analyticData, setAnalyticData] = useState([]);
  const [checkPoint, setCheckPoint] = useState(3); // TODO - use it to change checkout point from the ui

  useEffect(() => {
    getStockData('AAPL').then(
      //apple
      (result) => {
        setIsLoaded(true);
        setOriginalData(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      (error) => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, []);

  useEffect(() => {
    setDataByDay(groupByDay(originalData.values));
  }, [originalData]);

  useEffect(() => {
    setAnalyticData(analyzeStockData(dataByDay, checkPoint));
  }, [dataByDay, checkPoint]);

  const handleCheckpointChange = (event) => {
    event.preventDefault();
    setCheckPoint(event.target.value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <StockPageView
        checkPoint={checkPoint}
        analyticData={analyticData}
        handleCheckpointChange={handleCheckpointChange}
      />
    );
  }
};

export default StockPage;

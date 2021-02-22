import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { groupByDay, analyzeStockData } from '../utils';
import { getStockData } from '../api';
import StockPageView from './StockPageView';

// trade time 9am to  4pm

const StockPage = ({ checkPoint, match }) => {
  const { code } = useParams();
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStock, setCurrentStock] = useState(code || 'AAPL');
  const [originalData, setOriginalData] = useState([]);
  const [dataByDay, setDataByDay] = useState([]);
  const [analyticData, setAnalyticData] = useState([]);

  useEffect(() => {
    getStockData(currentStock).then(
      //apple
      result => {
        setIsLoaded(true);
        setOriginalData(result);
      },
      // Note: it's important to handle errors here
      // instead of a catch() block so that we don't swallow
      // exceptions from actual bugs in components.
      error => {
        setIsLoaded(true);
        setError(error);
      }
    );
  }, [currentStock]);

  useEffect(() => {
    setDataByDay(groupByDay(originalData.values));
  }, [originalData]);

  useEffect(() => {
    setAnalyticData(analyzeStockData(dataByDay, checkPoint));
  }, [dataByDay, checkPoint]);

  const handleStockSelect = event => {
    event.preventDefault();
    setIsLoaded(false);
    const { value } = event.target;
    setCurrentStock(value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <StockPageView
        analyticData={analyticData}
        currentStock={currentStock}
        handleStockSelect={handleStockSelect}
      />
    );
  }
};

export default StockPage;

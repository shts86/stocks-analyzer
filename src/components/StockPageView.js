import React from 'react';
import _ from 'lodash';
import StockTable from './common/StockTable';
import Summery from './common/Summary';

import StockSelect from './common/StockSelect';
import { getAvailableStocks } from '../api';

const StockPageView = ({
  currentStock,
  analyticData,
  handleStockSelect,
  ...props
}) => {
  const stocksAvailable = getAvailableStocks();
  return (
    <>
      <h2>
        {stocksAvailable[currentStock]} Stock ({currentStock})
      </h2>
      <StockSelect
        currentStock={currentStock}
        handleStockSelect={handleStockSelect}
      />

      <Summery data={analyticData} />

      {_.map(analyticData, day => (
        <div key={day.day}>
          <div>
            <StockTable data={day} />
          </div>
        </div>
      ))}
    </>
  );
};

export default StockPageView;

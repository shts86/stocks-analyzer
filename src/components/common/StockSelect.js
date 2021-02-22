import React from 'react';
import _ from 'lodash';

import { getAvailableStocks } from '../../api';

const StockSelect = ({ currentStock, handleStockSelect }) => {
  const stocksAvailable = getAvailableStocks();
  return (
    <select
      value={currentStock}
      name='stock-select'
      onChange={handleStockSelect}
      className='custom-select'
    >
      {_.map(stocksAvailable, (name, key) => (
        <option key={key} value={key}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default StockSelect;

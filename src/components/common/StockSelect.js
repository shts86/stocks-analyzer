import React from 'react';
import _ from 'lodash';

import { stocksList } from '../../utils/stocksList';

const StockSelect = ({ currentStock, handleStockSelect }) => {
  return (
    <select
      value={currentStock}
      name='stock-select'
      onChange={handleStockSelect}
      className='custom-select'
    >
      {_.map(stocksList, (name, key) => (
        <option key={key} value={key}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default StockSelect;

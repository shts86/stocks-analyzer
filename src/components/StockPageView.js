import React from 'react';
import _ from 'lodash';
import StockTable from './common/StockTable';
import Summery from './common/Summary';
import Checkpoint from './common/Checkpoint';
import StockSelect from './common/StockSelect';
import { stocksList } from '../utils/stocksList';

const StockPageView = ({
  checkPoint,
  handleCheckpointChange,
  currentStock,
  analyticData,
  handleStockSelect,
  ...props
}) => {
  return (
    <>
      <div className='jumbotron'>
        <h2>
          {stocksList[currentStock]} Stock ({currentStock})
        </h2>
        <StockSelect
          currentStock={currentStock}
          handleStockSelect={handleStockSelect}
        />
        <Checkpoint
          checkPoint={checkPoint}
          handleCheckpointChange={handleCheckpointChange}
        />
        <Summery data={analyticData} />

        {_.map(analyticData, day => (
          <div key={day.day}>
            <div>
              <StockTable data={day} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default StockPageView;

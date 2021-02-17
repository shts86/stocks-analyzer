import React from 'react';
import _ from 'lodash';
import StockTable from './common/StockTable';
import Summery from './common/Summary';
import Checkpoint from './common/Checkpoint';

const StockPageView = ({
  checkPoint,
  handleCheckpointChange,
  analyticData,
  ...props
}) => {
  return (
    <>
      <div className='jumbotron'>
        <h2>Stock Page</h2>
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

import React from 'react';
import _ from 'lodash';
import StockTable from './common/StockTable';

const sumAnalytic = (data) => {
  const totalMatch = _.filter(data, 'match').length;
  const totalNotMatch = _.filter(data, ['match', false]).length;
  return (
    <div>
      <span>Match: {totalMatch}</span>&nbsp;
      <span>Not Match: {totalNotMatch}</span>
    </div>
  );
};

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
        <div>
          <span>Select checkpoint</span>
          <select
            value={checkPoint}
            onChange={handleCheckpointChange}
            className='custom-select'
          >
            <option value='1'>After One our</option>
            <option value='3'>After Two ours</option>
            <option value='5'>After Three ours</option>
            <option value='7'>After four ours</option>
          </select>
        </div>
        {sumAnalytic(analyticData)}

        {_.map(analyticData, (day) => (
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

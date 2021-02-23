import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import './summary.css';

const Summary = ({ data, title, stockCode }) => {
  const totalDays = data.length;
  const totalMatch = _.filter(data, 'match').length;
  const totalNotMatch = _.filter(data, ['match', false]).length;
  return (
    <div className='summary-container'>
      {title && (
        <h4>
          {!!stockCode ? (
            <Link to={`/stock/${stockCode}`}>{title}</Link>
          ) : (
            title
          )}
        </h4>
      )}
      <div>
        <span className='text-success mr-3'>Match: {totalMatch}</span>
        <span className='text-danger mr-3'>Not Match: {totalNotMatch}</span>
        {totalDays !== 0 && (
          <span className='text-primary mr-3'>
            {((totalMatch * 100) / totalDays).toFixed(0)}%
          </span>
        )}
      </div>
    </div>
  );
};

export default Summary;

import React from 'react';
import _ from 'lodash';
import './summary.css';

const Summary = ({ data }) => {
  const totalDays = data.length;
  const totalMatch = _.filter(data, 'match').length;
  const totalNotMatch = _.filter(data, ['match', false]).length;
  return (
    <div className='summary-container'>
      <span className='text-success mr-3'>Match: {totalMatch}</span>
      <span className='text-danger mr-3'>Not Match: {totalNotMatch}</span>
      <span className='text-primary mr-3'>
        {((totalMatch * 100) / totalDays).toFixed(0)}%
      </span>
    </div>
  );
};

export default Summary;

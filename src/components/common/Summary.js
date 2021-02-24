import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';

import { Link } from 'react-router-dom';
import './summary.css';

const Summary = ({
  data,
  title,
  stockCode,
  lastUpdate,
  handleUpdate,
  isLoading,
}) => {
  const totalDays = data?.length;
  const totalMatch = _.filter(data, 'match').length;
  const totalNotMatch = _.filter(data, ['match', false]).length;
  return (
    <div className='summary-container d-flex'>
      <div>
        {title && (
          <h4>
            {!!stockCode ? (
              <>
                <Link to={`/stock/${stockCode}`}>{title}</Link>{' '}
                <small>({stockCode})</small>
              </>
            ) : (
              title
            )}
          </h4>
        )}
        {lastUpdate && (
          <div>
            <span className='text-success mr-3 d-inline-block sum-match'>
              Match: {totalMatch}
            </span>
            <span className='text-danger mr-3 d-inline-block sum-not-match'>
              Not Match: {totalNotMatch}
            </span>

            <span
              className={
                (!totalDays ? 'invisible' : 'mr-3') +
                ' text-primary d-inline-block sum-percent'
              }
            >
              {((totalMatch * 100) / totalDays).toFixed(0)}%
            </span>
          </div>
        )}
      </div>
      {(lastUpdate || !totalDays) && (
        <>
          {lastUpdate && (
            <div>
              <h4>
                <small>Last Update</small>
              </h4>
              <div>
                <small>{moment(lastUpdate).format('DD-MM-YYYY')}</small>
              </div>
            </div>
          )}
          <div
            className='d-flex align-items-center pl-3'
            role='button'
            title='Update'
          >
            <FA
              icon={faSyncAlt}
              onClick={() => handleUpdate(stockCode)}
              spin={isLoading}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Summary;

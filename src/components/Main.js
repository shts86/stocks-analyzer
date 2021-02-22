import React, { useState } from 'react';
import { Switch, Route } from 'react-router-dom';

import Header from './common/Header';
import Checkpoint from './common/Checkpoint';
import StockPage from './StockPage';
import StocksList from './StocksList';

const checkPercent = (name, value) => {
  const perNum = Number(value);
  if (name !== 'percent') return perNum;
  return perNum < 0.01 || perNum > 30 ? '' : perNum;
};

const Main = () => {
  const [checkPoint, setCheckPoint] = useState({ time: 3, percent: '' });

  const handleCheckpointChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    const checkedValue = checkPercent(name, value);
    setCheckPoint(prevCheckpoint => ({
      ...prevCheckpoint,
      [name]: checkedValue,
    }));
  };

  return (
    <>
      <Header />
      <div className='jumbotron'>
        <Checkpoint
          checkPoint={checkPoint}
          handleCheckpointChange={handleCheckpointChange}
        />
        <Switch>
          <Route
            path='/stock/:code'
            render={() => <StockPage checkPoint={checkPoint} />}
          />
          <Route
            path='/stock'
            render={() => <StockPage checkPoint={checkPoint} />}
          />
          <Route
            path='/'
            render={() => <StocksList checkPoint={checkPoint} />}
          />
        </Switch>
      </div>
    </>
  );
};

export default Main;

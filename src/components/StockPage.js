import React, { useState, useEffect } from 'react';
import _ from 'lodash';

// 9am to  4pm trade

const StockPage = () => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [originalData, setOriginalData] = useState([]);
  const [dataByDay, setDataByDay] = useState([]);
  const [analyticData, setAnalyticData] = useState([]);
  const [checkPoint, setCheckPoint] = useState(3); // TODO - use it to change checkout point from the ui

  useEffect(() => {
    fetch(
      // 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&outputsize=full&apikey=alphavantage&interval=60min&symbol=AAPL'
      'https://api.twelvedata.com/time_series?symbol=AAPL&outputsize=2000&interval=30min&order=ASC&apikey=55e371945e7d48dbbc110c4182e326b0'
    )
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setOriginalData(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  useEffect(() => {
    setDataByDay(restructureData(originalData.values));
  }, [originalData]);

  useEffect(() => {
    setAnalyticData(checkBehavior());
  }, [dataByDay, checkPoint]);

  const restructureData = (data) => {
    const mapedData = _.reduce(
      data,
      (result, value) => {
        const [day, time] = value.datetime.split(' ');

        (result[day] || (result[day] = [])).push({ ...value, day, time });
        return result;
      },
      {}
    );
    return mapedData;
  };

  const checkBehavior = () => {
    return _.map(dataByDay, (dates, day) => {
      const startOfDay = dates[0].open;
      const afterTwoOurs = dates[checkPoint].close;
      const endOfDay = dates[dates.length - 1].close;
      const match =
        (startOfDay < afterTwoOurs && afterTwoOurs < endOfDay) ||
        (startOfDay > afterTwoOurs && afterTwoOurs > endOfDay)
          ? true
          : false;
      const afterTwoOursPercentage = percentage(startOfDay, afterTwoOurs);
      const endOfDayPercentage = percentage(afterTwoOurs, endOfDay);
      return {
        day,
        match,
        startOfDay,
        afterTwoOurs,
        endOfDay,
        afterTwoOursPercentage,
        endOfDayPercentage,
      };
    });
  };

  const sumAnalytic = (data1) => {
    const totalMatch = _.filter(data1, 'match').length;
    const totalNotMatch = _.filter(data1, ['match', false]).length;
    return (
      <div>
        <span>Match: {totalMatch}</span>&nbsp;
        <span>Not Match: {totalNotMatch}</span>
      </div>
    );
  };

  const percentage = (beforeValue, nowValue) => {
    const percentageLong = (100 * (nowValue - beforeValue)) / beforeValue;
    return parseFloat(percentageLong.toFixed(2));
  };

  const drawBlock = (behavior) => {
    //  match,
    //  startOfDay,
    //  afterTwoOurs,
    //  endOfDay,
    //  afterTwoOursPercentage,
    //  endOfDayPercentage
    return (
      <div>
        <div
          className={`badge ${
            behavior.match ? 'badge-success' : 'badge-danger'
          }`}
        >
          {behavior.day}
        </div>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th scope='col'>Match</th>
              <th scope='col'>Start Of Day</th>
              <th scope='col'>On Checkpoint</th>
              <th scope='col'>End Of Day</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>{behavior.startOfDay}</th>
              <td>{behavior.startOfDay}</td>
              <td>{behavior.afterTwoOurs}</td>
              <td>{behavior.endOfDay}</td>
            </tr>
            <tr>
              <th>{behavior.match}</th>
              <td>-</td>
              <td
                className={
                  behavior.afterTwoOursPercentage > 0
                    ? 'text-success'
                    : 'text-danger'
                }
              >
                {behavior.afterTwoOursPercentage}%
              </td>
              <td
                className={
                  behavior.endOfDayPercentage > 0
                    ? 'text-success'
                    : 'text-danger'
                }
              >
                {behavior.endOfDayPercentage}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  };

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()

  const handleCheckpointChange = (event) => {
    event.preventDefault();
    setCheckPoint(event.target.value);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <h1>Loading...</h1>;
  } else {
    return (
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
            <div>{drawBlock(day)}</div>
          </div>
        ))}
      </div>
    );
  }
};

export default StockPage;

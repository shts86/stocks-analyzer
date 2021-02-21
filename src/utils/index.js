import _ from 'lodash';

export const percentage = (beforeValue, nowValue) => {
  const percentageLong = (100 * (nowValue - beforeValue)) / beforeValue;
  return parseFloat(percentageLong.toFixed(2));
};

export const groupByDay = data => {
  if (!_.isArray(data)) return;

  const [firstDay] = data[0].datetime.split(' ');
  const mappedData = _.reduce(
    data,
    (result, value) => {
      const [day, time] = value.datetime.split(' ');
      if (firstDay === day) return result; // first day come with partial data so ignore it

      (result[day] || (result[day] = [])).push({ ...value, day, time });
      return result;
    },
    {}
  );
  return mappedData;
};

export const analyzeStockData = (dataByDay, checkPoint) => {
  const checkpointTimeCheck = _(dataByDay)
    .map((dates, day) => {
      try {
        const startOfDay = dates[0].open;
        const checkpointTime = dates[checkPoint.time].close;
        const endOfDay = dates[dates.length - 1].close;
        const match =
          (startOfDay < checkpointTime && checkpointTime < endOfDay) ||
          (startOfDay > checkpointTime && checkpointTime > endOfDay)
            ? true
            : false;
        const checkpointTimePercentage = percentage(startOfDay, checkpointTime);
        const endOfDayPercentage = percentage(checkpointTime, endOfDay);
        const matchPercent =
          checkPoint.percent <= Math.abs(checkpointTimePercentage);
        return {
          day,
          match,
          matchPercent,
          startOfDay,
          checkpointTime,
          endOfDay,
          checkpointTimePercentage,
          endOfDayPercentage,
        };
      } catch {
        console.warn(`[analyzeStockData] - one error happened on day ${day}`);
        return false;
      }
    })
    .compact()
    .reverse()
    .value();

  const percentCheck =
    checkPoint.percent !== ''
      ? _.filter(checkpointTimeCheck, day => day.matchPercent)
      : checkpointTimeCheck;
  return percentCheck;
};

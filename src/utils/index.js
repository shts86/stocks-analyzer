import _ from 'lodash';

export const percentage = (beforeValue, nowValue) => {
  const percentageLong = (100 * (nowValue - beforeValue)) / beforeValue;
  return parseFloat(percentageLong.toFixed(2));
};

export const groupByDay = (data) => {
  const mappedData = _.reduce(
    data,
    (result, value) => {
      const [day, time] = value.datetime.split(' ');

      (result[day] || (result[day] = [])).push({ ...value, day, time });
      return result;
    },
    {}
  );
  return mappedData;
};

export const analyzeStockData = (dataByDay, checkPoint) => {
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

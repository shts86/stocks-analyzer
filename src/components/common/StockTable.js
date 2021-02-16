import { FontAwesomeIcon as FA } from '@fortawesome/react-fontawesome';
import { faFrown, faSmile } from '@fortawesome/free-solid-svg-icons';
import './StockTable.css';

const StockTable = ({ data }) => {
  return (
    <div>
      <div className={`badge ${data.match ? 'badge-success' : 'badge-danger'}`}>
        {data.day}
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
            <th>{data.startOfDay}</th>
            <td>{data.startOfDay}</td>
            <td>{data.afterTwoOurs}</td>
            <td>{data.endOfDay}</td>
          </tr>
          <tr>
            <th className='table-icon-cell'>
              <FA
                icon={data.match ? faSmile : faFrown}
                className={data.match ? 'text-success' : 'text-danger'}
              />
            </th>
            <td>-</td>
            <td
              className={
                data.afterTwoOursPercentage > 0 ? 'text-success' : 'text-danger'
              }
            >
              {data.afterTwoOursPercentage}%
            </td>
            <td
              className={
                data.endOfDayPercentage > 0 ? 'text-success' : 'text-danger'
              }
            >
              {data.endOfDayPercentage}%
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;

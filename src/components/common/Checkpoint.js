import React from 'react';
import './checkPoint.css';
const Checkpoint = ({ checkPoint, handleCheckpointChange }) => {
  return (
    <div className='st-checkpoint d-flex align-items-center'>
      <span className='mr-3'>Select checkpoint</span>
      <select
        value={checkPoint.time}
        name='time'
        onChange={handleCheckpointChange}
        className='custom-select mr-3'
      >
        <option value='1'>After One our</option>
        <option value='3'>After Two ours</option>
        <option value='5'>After Three ours</option>
        <option value='7'>After four ours</option>
      </select>
      <span className='mr-3'>checkpoint value</span>

      <div className='input-group'>
        <input
          value={checkPoint.percent}
          type='number'
          name='percent'
          step='0.5'
          className='form-control'
          onChange={handleCheckpointChange}
        ></input>
        <div className='input-group-append'>
          <span className='input-group-text'>%</span>
        </div>
      </div>
    </div>
  );
};

export default Checkpoint;

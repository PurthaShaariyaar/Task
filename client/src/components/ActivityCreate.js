import React, { useState } from 'react';
import axios from 'axios'

const ActivityCreate = ({ taskId }) => {

  const [activity, setActivity] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();

    await axios.post(`http://localhost:4001/tasks/${taskId}/activities`, {
      activity
    });

    setActivity('');
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <div className='form-group py-2'>
          <label>New Activity</label>
          <input
            className='form-control'
            value={activity}
            onChange={e => setActivity(e.target.value)}
          />
        </div>
        <button className='btn btn-primary'>Submit</button>
      </form>
    </div>
  );
}
export default ActivityCreate;

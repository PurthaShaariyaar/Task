import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = () => {

  const [tasks, setTasks] = useState({});

  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:4002/tasks');
    console.log(res.data);
    setTasks(res.data);
  }

  useEffect(() => {
    fetchTasks();
  }, []);


  const renderedTasks = Object.values(tasks).map((task) => {
    return (
      <div
        className='card'
        style={{ width: '30%', marginBottom: '20px' }}
        key={task.id}
      >
        <div className='card-body'>
          {task.name}
        </div>
      </div>
    );
  });

  return (
    <div className='d-flex flex-row flex-wrap justify-content-between'>
      {renderedTasks}
    </div>
  );
}

export default TaskList;

import React from 'react';
import TaskCreate from './components/TaskCreate';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <div className='container'>
      <h1>Create a Task</h1>
      <TaskCreate />
      <hr />
      <h1>Tasks</h1>
      <TaskList />
    </div>
  );
}

export default App;

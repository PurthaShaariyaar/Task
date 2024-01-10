import React from 'react';

const ActivityList = ({ activities }) => {

  const renderedActivities = activities.map(activity => {
    return (
      <li key={activity.id}>
        {activity.activity}
      </li>
    );
  });

  return (
    <ul>
      {renderedActivities}
    </ul>
  );
}

export default ActivityList;

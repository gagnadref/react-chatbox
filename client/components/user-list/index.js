import React, { PropTypes } from 'react';
import {} from './style.less';

const UserList = (props) => (
  <ul className="user-list">
    {props.users.map((user, index) => {
      if (user.userId !== props.userId) {
        return (
          <li key={`user-${index}`} className="user-item">
            <p>
              {user.userId}
            </p>
          </li>
        );
      }

      return (
        <li />
      );
    })}
  </ul>
);

UserList.propTypes = {
  users: PropTypes.array,
  userId: PropTypes.string,
};

export default UserList;

import React, { Component, PropTypes } from 'react';
import {} from './style.less';

class UserList extends Component {
  render() {
    return (
      <ul className="user-list">
        {this.props.users.map((user, index) => {
          if (user.userId !== this.props.userId) {
            return (
              <li key={`user-${index}`} className="user-item">
                <p>
                  {user.userId}
                </p>
              </li>
            );
          }

          return (
            <span />
          );
        })}
      </ul>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.array,
  userId: PropTypes.string,
};

export default UserList;

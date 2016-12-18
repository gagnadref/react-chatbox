import React, { Component, PropTypes } from 'react';
import {} from './style.less';

class UserList extends Component {
  render() {
    return (
      <ul className="user-list">
        {Object.keys(this.props.users).map((userId, index) => {
          const user = this.props.users[userId];

          if (user.userId !== this.props.userId) {
            return (
              <li
                key={`user-${index}`}
                className="user-item"
                onClick={() => this.props.sendChatRequest(user.userId)}
              >
                <p>
                  {user.name}
                </p>
              </li>
            );
          }

          return (
            <span />
          );
        })}
        {Object.keys(this.props.users).length === 0 &&
          <li
            className="user-item"
          >
            <p>
              No one is available at the moment
            </p>
          </li>
        }
      </ul>
    );
  }
}

UserList.propTypes = {
  users: PropTypes.object,
  userId: PropTypes.string,
  sendChatRequest: PropTypes.func,
};

export default UserList;

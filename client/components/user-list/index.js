import React, { Component, PropTypes } from 'react';
import {} from './style.less';

class UserList extends Component {
  getChatByUserId(userId) {
    return Object.keys(this.props.chats).find((chatId) => userId in this.props.chats[chatId].users);
  }

  handleClick(userId) {
    const chatId = this.getChatByUserId(userId);

    if (chatId) {
      this.props.openChat(chatId);
    } else {
      this.props.sendChatRequest(userId);
    }
  }

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
                onClick={() => this.handleClick(user.userId)}
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
        {Object.keys(this.props.users).length <= 1 &&
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
  chats: PropTypes.object,
  users: PropTypes.object,
  userId: PropTypes.string,
  sendChatRequest: PropTypes.func,
  openChat: PropTypes.func,
};

export default UserList;

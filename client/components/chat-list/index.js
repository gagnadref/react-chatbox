import React, { PropTypes } from 'react';

import {} from './style.less';
import Chat from '../chat';

const ChatList = (props) => (
  <ol className="chat-list">
    {Object.keys(props.chats)
      .filter((chatId) => !props.chats[chatId].isClosed)
      .map((chatId, index) => {
        const chat = props.chats[chatId];

        return (
          <li key={`chat-${index}`} className="chat-item">
            <Chat
              chat={chat}
              userId={props.userId}
              updateMessage={props.updateMessage}
              addMessage={props.addMessage}
              translate={props.translate}
              onClose={props.closeChat}
            />
          </li>
        );
      })
    }
  </ol>
);

ChatList.propTypes = {
  userId: PropTypes.number,
  chats: PropTypes.object,
  updateMessage: PropTypes.func,
  addMessage: PropTypes.func,
  translate: PropTypes.func,
  closeChat: PropTypes.func,
};

export default ChatList;

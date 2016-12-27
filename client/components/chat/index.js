import React, { PropTypes } from 'react';

import {} from './style.less';
import MessageList from '../message-list';
import MessageEntryBox from '../message-entry-box';

const Chat = (props) => {
  const title = Object.keys(props.chat.users)
    .filter((userId) => userId !== props.userId)
    .map((userId) => props.chat.users[userId].name)
    .join(', ');

  return (
    <div className="chat">
      <div className="chat-title">
        {title}
        <span className="chat-close" onClick={() => props.onClose(props.chat.chatId)}>
          <i className="icon-close"></i>
        </span>
      </div>
      <MessageList
        userId={props.userId}
        messages={props.chat.messages}
        translate={props.translate}
      />
      <MessageEntryBox
        chatId={props.chat.chatId}
        value={props.chat.currentMessage}
        userId={props.userId}
        onChange={props.updateMessage}
        onSubmit={props.addMessage}
      />
    </div>
  );
};

Chat.propTypes = {
  chat: PropTypes.object,
  userId: PropTypes.string,
  updateMessage: PropTypes.func,
  addMessage: PropTypes.func,
  translate: PropTypes.func,
  onClose: PropTypes.func,
};

export default Chat;

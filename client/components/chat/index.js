import React, { PropTypes } from 'react';

import {} from './style.less';
import MessageList from '../message-list';
import MessageEntryBox from '../message-entry-box';

const Chat = (props) => (
  <div className="chat">
    <MessageList userId={props.userId} messages={props.messages} />
    <MessageEntryBox
      chatId={props.chatId}
      value={props.currentMessage}
      userId={props.userId}
      onChange={props.updateMessage}
      onSubmit={props.addMessage}
    />
  </div>
);

Chat.propTypes = {
  chatId: PropTypes.string,
  userId: PropTypes.string,
  messages: PropTypes.array,
  currentMessage: PropTypes.string,
  updateMessage: PropTypes.func,
  addMessage: PropTypes.func,
};

export default Chat;

import React, { PropTypes } from 'react';
import {} from './style.less';
import MessageList from '../message-list';
import MessageEntryBox from '../message-entry-box';

const Chat = (props) => (
  <div>
    <MessageList userId={props.userId} messages={props.messages} />
    <MessageEntryBox
      value={props.currentMessage}
      userId={props.userId}
      onChange={props.updateMessage}
      onSubmit={props.addMessage}
    />
  </div>
);

Chat.propTypes = {
  userId: PropTypes.string,
  messages: PropTypes.array,
  currentMessage: PropTypes.string,
  updateMessage: PropTypes.func,
  addMessage: PropTypes.func,
};

export default Chat;

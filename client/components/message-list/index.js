import React, { PropTypes } from 'react';
import {} from './style.less';

const MessageList = (props) => (
  <ol className="message-list">
    {props.messages.map((message, index) => {
      const messageClass = message.userId !== props.userId ? 'is-response' : '';
      return (
        <li key={`message-${index}`} className="message-item">
          <p className={`message ${messageClass}`}>
            {message.text}
          </p>
        </li>
      );
    })}
  </ol>
);

MessageList.propTypes = {
  messages: PropTypes.object,
  userId: PropTypes.string,
};

export default MessageList;

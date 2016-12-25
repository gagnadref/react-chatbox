import React, { PropTypes } from 'react';
import {} from './style.less';

const MessageList = (props) => (
  <ol className="message-list">
    {props.messages.map((message, index) => {
      const isResponse = message.userId !== props.userId;
      const isTranslated = !!message.translation;

      return (
        <li key={`message-${index}`} className="message-item">
          <p className={`message ${isResponse ? 'is-response' : ''}`}>
            {message.text}<br />
            {isResponse && !isTranslated &&
              <a className="translate-button" onClick={() => props.translate(props.chatId, index)}>
                See translation
              </a>
            }
            {isResponse && isTranslated &&
              <span className="translation">{message.translation}</span>
            }
          </p>
        </li>
      );
    })}
  </ol>
);

MessageList.propTypes = {
  chatId: PropTypes.number,
  messages: PropTypes.object,
  userId: PropTypes.string,
  translate: PropTypes.func,
};

export default MessageList;

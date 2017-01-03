import React, { Component, PropTypes } from 'react';
import $ from 'jquery';

import {} from './style.less';

class MessageList extends Component {
  componentDidMount() {
    $(this.refs.messageList).bind('mousewheel DOMMouseScroll', function(e) {
      let scrollTo = null;

      if (e.type === 'mousewheel') {
        scrollTo = (e.originalEvent.wheelDelta * -1);
      } else if (e.type === 'DOMMouseScroll') {
        scrollTo = 40 * e.originalEvent.detail;
      }

      if (scrollTo) {
        e.preventDefault();
        $(this).scrollTop(scrollTo + $(this).scrollTop());
      }
    });
  }

  render() {
    return (
      <ol className="message-list" ref="messageList">
        {this.props.messages.map((message, index) => {
          const isResponse = message.userId !== this.props.userId;
          const isTranslated = !!message.translation;

          return (
            <li key={`message-${index}`} className="message-item">
              <p className={`message ${isResponse ? 'is-response' : ''}`}>
                {message.text}<br />
                {isResponse && !isTranslated &&
                  <a
                    className="translate-button"
                    onClick={() => this.props.translate(message, index)}
                  >
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
  }
}

MessageList.propTypes = {
  messages: PropTypes.array,
  userId: PropTypes.string,
  translate: PropTypes.func,
};

export default MessageList;

import React, { Component, PropTypes } from 'react';
import {} from './style.less';

class MessageEntryBox extends Component {
  handleChange(ev) {
    this.props.onChange(ev.target.value);
  }

  handleKeyPress(ev) {
    if (ev.which === 13) {
      const trimmedMessage = this.props.value.trim();

      if (trimmedMessage) {
        this.props.onSubmit({
          text: trimmedMessage,
          chatId: this.props.chatId,
          userId: this.props.userId,
        });
      }

      ev.preventDefault();
    }
  }

  render() {
    return (
      <div className="message-entry-box">
        <textarea
          name="message"
          placeholder="Enter a message"
          value={this.props.value}
          onChange={(ev) => this.handleChange(ev)}
          onKeyPress={(ev) => this.handleKeyPress(ev)}
        />
      </div>
    );
  }
}

MessageEntryBox.propTypes = {
  chatId: PropTypes.string,
  userId: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default MessageEntryBox;

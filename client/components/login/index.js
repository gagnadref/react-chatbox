import React, { Component, PropTypes } from 'react';

import {} from './style.less';

class Login extends Component {
  handleChange(ev) {
    this.props.onChange(ev.target.value);
  }

  handleKeyPress(ev) {
    if (ev.which === 13) {
      const trimmedName = this.props.value.trim();

      if (trimmedName) {
        this.props.onSubmit(trimmedName);
      }

      ev.preventDefault();
    }
  }

  render() {
    return (
      <div className="login-box">
        <label htmlFor="message">
          Please provide your name bellow to start chatting with other students
        </label>
        <div className="prompt" />
        <input
          id="message"
          name="message"
          placeholder="* Name"
          value={this.props.value}
          onChange={(ev) => this.handleChange(ev)}
          onKeyPress={(ev) => this.handleKeyPress(ev)}
        />
      </div>
    );
  }
}

Login.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Login;

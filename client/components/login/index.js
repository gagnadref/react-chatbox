import React, { Component, PropTypes } from 'react';

import {} from './style.less';

class Login extends Component {
  handleChange(info, ev) {
    this.props.onChange(info, ev.target.value);
  }

  handleKeyPress(info, ev) {
    if (ev.which === 13) {
      const trimmedName = this.props.user[`${info}Current`].trim();

      if (trimmedName) {
        this.props.onSubmit(info, trimmedName);
      }

      ev.preventDefault();
    }
  }

  render() {
    return (
      <div className="login-box">
        {!this.props.user.name &&
          <div className="login-name">
            <label htmlFor="login-name">
              Please provide your name bellow to start chatting with other students
            </label>
            <div className="prompt" />
            <input
              id="login-name"
              name="login-name"
              placeholder="* Name"
              value={this.props.user.nameCurrent}
              onChange={(ev) => this.handleChange('name', ev)}
              onKeyPress={(ev) => this.handleKeyPress('name', ev)}
            />
          </div>
        }
        {this.props.user.name && !this.props.user.languages &&
          <div className="login-language">
            <label htmlFor="login-language">
              What languages do you speak?
            </label>
            <div className="prompt" />
            <input
              id="login-language"
              name="login-language"
              placeholder="* My languages"
              value={this.props.user.languagesCurrent}
              onChange={(ev) => this.handleChange('languages', ev)}
              onKeyPress={(ev) => this.handleKeyPress('languages', ev)}
            />
          </div>
        }
        {this.props.user.name && this.props.user.languages &&
          !this.props.user.studyField &&
          <div className="login-study-field">
            <label htmlFor="login-study-field">
              What are you studying?
            </label>
            <div className="prompt" />
            <input
              id="login-study-field"
              name="login-study-field"
              placeholder="* Study field"
              value={this.props.user.studyFieldCurrent}
              onChange={(ev) => this.handleChange('studyField', ev)}
              onKeyPress={(ev) => this.handleKeyPress('studyField', ev)}
            />
          </div>
        }
        {this.props.user.name && this.props.user.languages &&
          this.props.user.studyField && !this.props.user.studyLevel &&
          <div className="login-study-level">
            <label htmlFor="login-study-level">
              At what level are you studying?
            </label>
            <div className="prompt" />
            <input
              id="login-study-level"
              name="login-study-level"
              placeholder="* Study level"
              value={this.props.user.studyLevelCurrent}
              onChange={(ev) => this.handleChange('studyLevel', ev)}
              onKeyPress={(ev) => this.handleKeyPress('studyLevel', ev)}
            />
          </div>
        }
      </div>
    );
  }
}

Login.propTypes = {
  user: PropTypes.object,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default Login;

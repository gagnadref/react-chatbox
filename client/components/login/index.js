import React, { Component, PropTypes } from 'react';
import Select from 'react-select';

import {} from './style.less';
import {} from './select.less';

class Login extends Component {
  handleChange(info, value) {
    this.props.onChange(info, value);
  }

  submit(info, ev) {
    if (ev.which === 13) {
      const trimmedName = this.props.user[`${info}Current`].trim();

      if (trimmedName) {
        this.props.onSubmit(info, trimmedName);
      }

      ev.preventDefault();
    }
  }

  submitLanguages() {
    this.props.onSubmit('languages', this.props.user.languagesCurrent);
  }

  render() {
    const languages = [
      { value: 'french', label: 'French' },
      { value: 'english', label: 'English' },
      { value: 'arabic', label: 'Arabic' },
      { value: 'other', label: 'Other' },
    ];

    return (
      <div className="login-box">
        {!this.props.user.name &&
          <div className="login-name">
            <label>
              Please answer the following questions to start chatting with other students.
            </label>
            <label htmlFor="login-name">
              {'What\'s your name?'}
            </label>
            <div className="prompt" />
            <input
              id="login-name"
              name="login-name"
              placeholder="* Name"
              value={this.props.user.nameCurrent}
              onChange={(ev) => this.handleChange('name', ev.target.value)}
              onKeyPress={(ev) => this.submit('name', ev)}
            />
          </div>
        }
        {this.props.user.name && !this.props.user.languages &&
          <div className="login-language">
            <label htmlFor="login-language">
              What languages do you speak?
            </label>
            <div className="prompt" />
            <Select
              id="login-language"
              name="login-language"
              value={this.props.user.languagesCurrent}
              options={languages}
              onChange={(value) => this.handleChange('languages', value)}
              multi
              clearableValue={false}
            />
            <button className="login-submit" onClick={() => this.submitLanguages()}>Next</button>
          </div>
        }
        {this.props.user.name && this.props.user.languages &&
          !this.props.user.studyField &&
          <div className="login-study-field">
            <label htmlFor="login-study-field">
              What do you study?
            </label>
            <div className="prompt" />
            <input
              id="login-study-field"
              name="login-study-field"
              placeholder="* Study field"
              value={this.props.user.studyFieldCurrent}
              onChange={(ev) => this.handleChange('studyField', ev.target.value)}
              onKeyPress={(ev) => this.submit('studyField', ev)}
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

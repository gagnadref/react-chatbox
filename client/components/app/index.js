import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {} from './style.less';
import * as messageActionCreators from '../../actions/message-actions';
import UserList from '../user-list';
import Login from '../login';

class App extends Component {
  render() {
    if (this.props.user.name) {
      return (
        <UserList
          userId={this.props.user.userId}
          users={this.props.users}
        />
      );
    }

    return (
      <Login
        value={this.props.user.currentName}
        onChange={this.props.updateName}
        onSubmit={this.props.submitName}
      />
    );
  }
}

App.propTypes = {
  users: PropTypes.object,
  user: PropTypes.object,
  updateName: PropTypes.func,
  submitName: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(messageActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

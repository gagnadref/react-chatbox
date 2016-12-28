import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {} from './style.less';
import * as messageActionCreators from '../../actions/message-actions';
import UserList from '../user-list';
import ChatList from '../chat-list';
import Login from '../login';

class App extends Component {
  render() {
    if (this.props.user.name) {
      return (
        <div>
          <UserList
            chats={this.props.chats}
            userId={this.props.user.userId}
            users={this.props.users}
            sendChatRequest={this.props.sendChatRequest}
            openChat={this.props.openChat}
          />
          <ChatList
            userId={this.props.user.userId}
            chats={this.props.chats}
            updateMessage={this.props.updateMessage}
            addMessage={this.props.addMessage}
            translate={this.props.translate}
            closeChat={this.props.closeChat}
          />
        </div>
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
  chats: PropTypes.object,
  sendChatRequest: PropTypes.func,
  updateName: PropTypes.func,
  submitName: PropTypes.func,
  updateMessage: PropTypes.func,
  addMessage: PropTypes.func,
  translate: PropTypes.func,
  closeChat: PropTypes.func,
  openChat: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    user: state.user,
    chats: state.chats,
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(messageActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

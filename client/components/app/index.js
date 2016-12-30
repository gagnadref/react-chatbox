import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {} from './style.less';
import * as messageActionCreators from '../../actions/message-actions';
import UserList from '../user-list';
import ChatList from '../chat-list';
import Login from '../login';

class App extends Component {
  isFullyAuthenticated() {
    return this.props.user.name && this.props.user.languages && this.props.user.studyField && this.props.user.studyLevel;
  }

  render() {
    return (
      <div>
        <div className="user-list-container">
          <div className="user-list-title" onClick={() => this.props.toggleChatbox()}>
            Talk to other students
          </div>
          {this.isFullyAuthenticated() && this.props.isOpen &&
            <UserList
              chats={this.props.chats}
              userId={this.props.user.userId}
              users={this.props.users}
              sendChatRequest={this.props.sendChatRequest}
              openChat={this.props.openChat}
            />
          }
          {!this.isFullyAuthenticated() && this.props.isOpen &&
            <Login
              user={this.props.user}
              onChange={this.props.updatePersonalInfo}
              onSubmit={this.props.submitPersonalInfo}
            />
          }
        </div>
        {this.props.isOpen &&
          <ChatList
            userId={this.props.user.userId}
            chats={this.props.chats}
            updateMessage={this.props.updateMessage}
            addMessage={this.props.addMessage}
            translate={this.props.translate}
            closeChat={this.props.closeChat}
          />
        }
      </div>
    );
  }
}

App.propTypes = {
  isOpen: PropTypes.bool,
  users: PropTypes.object,
  user: PropTypes.object,
  chats: PropTypes.object,
  sendChatRequest: PropTypes.func,
  updatePersonalInfo: PropTypes.func,
  submitPersonalInfo: PropTypes.func,
  updateMessage: PropTypes.func,
  addMessage: PropTypes.func,
  translate: PropTypes.func,
  closeChat: PropTypes.func,
  openChat: PropTypes.func,
  toggleChatbox: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isOpen: state.isOpen,
    user: state.user,
    chats: state.chats,
    users: state.users,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(messageActionCreators, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

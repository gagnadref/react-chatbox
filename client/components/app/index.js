import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {} from './style.less';
import * as messageActionCreators from '../../actions/message-actions';
import UserList from '../user-list';
import ChatList from '../chat-list';
import Login from '../login';

const App = (props) => (
  <div>
    <div className="user-list-container">
      <div className="user-list-title">Talk to other students</div>
      {props.user.name ?
        <UserList
          chats={props.chats}
          userId={props.user.userId}
          users={props.users}
          sendChatRequest={props.sendChatRequest}
          openChat={props.openChat}
        /> :
        <Login
          value={props.user.currentName}
          onChange={props.updateName}
          onSubmit={props.submitName}
        />
      }
    </div>
    <ChatList
      userId={props.user.userId}
      chats={props.chats}
      updateMessage={props.updateMessage}
      addMessage={props.addMessage}
      translate={props.translate}
      closeChat={props.closeChat}
    />
  </div>
);

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

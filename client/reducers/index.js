import { combineReducers } from 'redux';

import * as actions from '../actions/message-actions';


export default function (initialState) {
  function messagesReducer(currentMessages = initialState.messages, action) {
    const messages = currentMessages.map(message => Object.assign({}, message));

    switch (action.type) {
      case actions.ADD_MESSAGE:
      case actions.ADD_RESPONSE:
        messages.push(Object.assign({}, action.message));
        return messages;
      default:
        return currentMessages;
    }
  }

  function currentMessageReducer(currentMessage = initialState.currentMessage, action) {
    switch (action.type) {
      case actions.UPDATE_MESSAGE:
        return action.message;
      case actions.ADD_MESSAGE:
        return '';
      default:
        return currentMessage;
    }
  }

  function userReducer(currentUser = initialState.user, action) {
    switch (action.type) {
      case actions.SET_USER_ID:
        return Object.assign({}, currentUser, {
          userId: action.userId,
        });
      case actions.UPDATE_NAME:
        return Object.assign({}, currentUser, {
          currentName: action.name,
        });
      case actions.SUBMIT_NAME:
        return Object.assign({}, currentUser, {
          name: action.name,
        });
      default:
        return currentUser;
    }
  }

  function userListReducer(currentUserList = initialState.users, action) {
    if (action.type === actions.UPDATE_USER_LIST) {
      return action.users;
    }

    return currentUserList;
  }

  function chatListReducer(currentChatList = initialState.chats, action) {
    const chats = currentChatList.map(chat => Object.assign({}, chat));

    switch (action.type) {
      case actions.CREATE_NEW_CHAT:
        chats.push(Object.assign({}, action.chat));
        return chats;
      default:
        return currentChatList;
    }
  }

  return combineReducers({
    user: userReducer,
    users: userListReducer,
    currentMessage: currentMessageReducer,
    messages: messagesReducer,
    chats: chatListReducer,
  });
}

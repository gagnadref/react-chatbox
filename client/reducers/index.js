import { combineReducers } from 'redux';
import {
  UPDATE_MESSAGE,
  ADD_MESSAGE,
  ADD_RESPONSE,
  SET_USER_ID,
  UPDATE_USER_LIST,
  UPDATE_NAME,
  SUBMIT_NAME,
} from '../actions/message-actions';

export default function (initialState) {
  function messagesReducer(currentMessages = initialState.messages, action) {
    const messages = currentMessages.map(message => Object.assign({}, message));

    switch (action.type) {
      case ADD_MESSAGE:
      case ADD_RESPONSE:
        messages.push(Object.assign({}, action.message));
        return messages;
      default:
        return currentMessages;
    }
  }

  function currentMessageReducer(currentMessage = initialState.currentMessage, action) {
    switch (action.type) {
      case UPDATE_MESSAGE:
        return action.message;
      case ADD_MESSAGE:
        return '';
      default:
        return currentMessage;
    }
  }

  function userReducer(currentUser = initialState.user, action) {
    switch (action.type) {
      case SET_USER_ID:
        return Object.assign({}, currentUser, {
          userId: action.userId,
        });
      case UPDATE_NAME:
        return Object.assign({}, currentUser, {
          currentName: action.name,
        });
      case SUBMIT_NAME:
        return Object.assign({}, currentUser, {
          name: action.name,
        });
      default:
        return currentUser;
    }
  }

  function userListReducer(currentUserList = initialState.users, action) {
    if (action.type === UPDATE_USER_LIST) {
      return action.users;
    }

    return currentUserList;
  }

  return combineReducers({
    user: userReducer,
    users: userListReducer,
    currentMessage: currentMessageReducer,
    messages: messagesReducer,
  });
}

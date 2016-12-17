import { combineReducers } from 'redux';
import {
  UPDATE_MESSAGE,
  ADD_MESSAGE,
  ADD_RESPONSE,
  SET_USER_ID,
  UPDATE_USER_LIST,
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

  function userIdReducer(currentUserId = initialState.userId, action) {
    if (action.type === SET_USER_ID) {
      return action.userId;
    }

    return currentUserId;
  }

  function usersReducer(currentUsers = initialState.users, action) {
    if (action.type === UPDATE_USER_LIST) {
      return action.users;
    }

    return currentUsers;
  }

  return combineReducers({
    userId: userIdReducer,
    users: usersReducer,
    currentMessage: currentMessageReducer,
    messages: messagesReducer,
  });
}

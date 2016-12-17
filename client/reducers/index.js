import { combineReducers } from 'redux';

import * as actions from '../actions/message-actions';


export default function (initialState) {
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
    let messages;

    switch (action.type) {
      case actions.CREATE_NEW_CHAT:
        return Object.assign({}, currentChatList, {
          [action.chat.chatId]: action.chat,
        });
      case actions.UPDATE_MESSAGE:
        return Object.assign({}, currentChatList, {
          [action.chatId]: Object.assign({}, currentChatList[action.chatId], {
            currentMessage: action.message,
          }),
        });
      case actions.ADD_MESSAGE:
        messages = currentChatList[action.message.chatId].messages.map(
          message => Object.assign({}, message)
        );
        messages.push(Object.assign({}, action.message));

        return Object.assign({}, currentChatList, {
          [action.message.chatId]: Object.assign({}, currentChatList[action.message.chatId], {
            currentMessage: '',
            messages,
          }),
        });
      case actions.ADD_RESPONSE:
        messages = currentChatList[action.message.chatId].messages.map(
          message => Object.assign({}, message)
        );
        messages.push(Object.assign({}, action.message));

        return Object.assign({}, currentChatList, {
          [action.message.chatId]: Object.assign({}, currentChatList[action.message.chatId], {
            messages,
          }),
        });
      default:
        return currentChatList;
    }
  }

  return combineReducers({
    user: userReducer,
    users: userListReducer,
    chats: chatListReducer,
  });
}

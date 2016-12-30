import { combineReducers } from 'redux';

import * as actions from '../actions/message-actions';


export default function (initialState) {
  function isOpenReducer(currentIsOpen = initialState.isOpen, action) {
    switch (action.type) {
      case actions.TOGGLE_CHATBOX:
        return !currentIsOpen;
      default:
        return currentIsOpen;
    }
  }

  function userReducer(currentUser = initialState.user, action) {
    switch (action.type) {
      case actions.SET_USER_ID:
        return Object.assign({}, currentUser, {
          userId: action.userId,
        });
      case actions.UPDATE_PERSONAL_INFO:
        return Object.assign({}, currentUser, {
          [`${action.info}Current`]: action.value,
        });
      case actions.SUBMIT_PERSONAL_INFO:
        return Object.assign({}, currentUser, {
          [action.info]: action.value,
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
            isClosed: false,
          }),
        });
      case actions.TRANSLATION_REQUEST_SUCCESS:
        messages = currentChatList[action.message.chatId].messages.map(
          message => Object.assign({}, message)
        );
        messages[action.messageIndex].translation = action.translation;

        return Object.assign({}, currentChatList, {
          [action.message.chatId]: Object.assign({}, currentChatList[action.message.chatId], {
            messages,
          }),
        });
      case actions.CLOSE_CHAT:
        return Object.assign({}, currentChatList, {
          [action.chatId]: Object.assign({}, currentChatList[action.chatId], {
            isClosed: true,
          }),
        });
      case actions.OPEN_CHAT:
        return Object.assign({}, currentChatList, {
          [action.chatId]: Object.assign({}, currentChatList[action.chatId], {
            isClosed: false,
          }),
        });
      default:
        return currentChatList;
    }
  }

  return combineReducers({
    isOpen: isOpenReducer,
    user: userReducer,
    users: userListReducer,
    chats: chatListReducer,
  });
}

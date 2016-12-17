export const UPDATE_MESSAGE = 'update-message';
export const ADD_MESSAGE = 'add-message';
export const ADD_RESPONSE = 'add-response';
export const SET_USER_ID = 'setUserId';
export const UPDATE_USER_LIST = 'updateUserList';
export const UPDATE_NAME = 'updateName';
export const SUBMIT_NAME = 'submitName';
export const SEND_CHAT_REQUEST = 'sendChatRequest';
export const CREATE_NEW_CHAT = 'createNewChat';

export function updateMessage(chatId, message) {
  return { type: UPDATE_MESSAGE, chatId, message };
}

export function addMessage(message) {
  return { type: ADD_MESSAGE, message };
}

export function addResponse(message) {
  return { type: ADD_RESPONSE, message };
}

export function setUserId(userId) {
  return { type: SET_USER_ID, userId };
}

export function updateUserList(users) {
  return { type: UPDATE_USER_LIST, users };
}

export function updateName(name) {
  return { type: UPDATE_NAME, name };
}

export function submitName(name) {
  return { type: SUBMIT_NAME, name };
}

export function sendChatRequest(userId) {
  return { type: SEND_CHAT_REQUEST, userId };
}

export function createNewChat(chat) {
  return { type: CREATE_NEW_CHAT, chat };
}

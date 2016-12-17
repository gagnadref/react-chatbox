export const UPDATE_MESSAGE = 'update-message';
export const ADD_MESSAGE = 'add-message';
export const ADD_RESPONSE = 'add-response';
export const SET_USER_ID = 'setUserId';
export const UPDATE_USER_LIST = 'updateUserList';
export const UPDATE_NAME = 'updateName';
export const SUBMIT_NAME = 'submitName';

export function updateMessage(message) {
  return { type: UPDATE_MESSAGE, message };
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

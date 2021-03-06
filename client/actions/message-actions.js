import Yandex from '../services/yandex.js';

export const TOGGLE_CHATBOX = 'toggleChatbox';
export const UPDATE_MESSAGE = 'updateMessage';
export const ADD_MESSAGE = 'addMessage';
export const ADD_RESPONSE = 'addResponse';
export const SET_USER_ID = 'setUserId';
export const UPDATE_USER_LIST = 'updateUserList';
export const UPDATE_NAME = 'updateName';
export const SUBMIT_NAME = 'submitName';
export const SEND_CHAT_REQUEST = 'sendChatRequest';
export const CREATE_NEW_CHAT = 'createNewChat';
export const CLOSE_CHAT = 'closeChat';
export const OPEN_CHAT = 'openChat';
export const TRANSLATION_REQUEST_SENT = 'translationRequestSent';
export const TRANSLATION_REQUEST_SUCCESS = 'translationRequestSuccess';

export function toggleChatbox() {
  return { type: TOGGLE_CHATBOX };
}

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

export function closeChat(chatId) {
  return { type: CLOSE_CHAT, chatId };
}

export function openChat(chatId) {
  return { type: OPEN_CHAT, chatId };
}

export function sendTranslationRequest(message, messageIndex) {
  return { type: TRANSLATION_REQUEST_SENT, message, messageIndex };
}

export function receiveTranslation(message, messageIndex, translation) {
  return { type: TRANSLATION_REQUEST_SUCCESS, message, messageIndex, translation };
}

export function translate(message, messageIndex) {
  return (dispatch) => {
    dispatch(sendTranslationRequest(message, messageIndex));

    return Yandex.translate(message.text)
      .then((body) => {
        dispatch(receiveTranslation(message, messageIndex, body.text[0]));
      });
  };
}

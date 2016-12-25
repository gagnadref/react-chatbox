import * as actions from './actions/message-actions';
import io from 'socket.io-client';

let socket = null;

export function chatMiddleware() {
  return next => (action) => {
    if (!socket) {
      return next(action);
    }

    switch (action.type) {
      case actions.ADD_MESSAGE:
        socket.emit('message', action.message);
        break;
      case actions.SUBMIT_NAME:
        socket.emit('name', action.name);
        break;
      case actions.SEND_CHAT_REQUEST:
        socket.emit('chat', action.userId);
        break;
      case actions.TRANSLATE:
        // TODO: send translation request
        // TODO: move this to API middleware
        break;
      default:
    }

    return next(action);
  };
}

export default function (store) {
  socket = io.connect(`${location.protocol}//${location.host}`);

  socket.on('start', (data) => {
    store.dispatch(actions.setUserId(data.userId));
  });

  socket.on('update-user-list', (users) => {
    store.dispatch(actions.updateUserList(users));
  });

  socket.on('message', (data) => {
    store.dispatch(actions.addResponse(data));
  });

  socket.on('create-new-chat', (chat) => {
    store.dispatch(actions.createNewChat(chat));
  });
}

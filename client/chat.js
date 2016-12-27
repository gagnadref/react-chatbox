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
      default:
    }

    return next(action);
  };
}

export default function (store) {
  socket = io.connect(`${location.protocol}//${location.host}`);

  socket.on('connect', () => {
    socket.emit('join', store.getState().user);
  });

  socket.on('setUserId', (userId) => {
    store.dispatch(actions.setUserId(userId));
  });

  socket.on('updateUserList', (users) => {
    store.dispatch(actions.updateUserList(users));
  });

  socket.on('message', (data) => {
    store.dispatch(actions.addResponse(data));
  });

  socket.on('createNewChat', (chat) => {
    store.dispatch(actions.createNewChat(chat));
  });
}

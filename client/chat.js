import * as actions from './actions/message-actions';
import io from 'socket.io-client';

let socket = null;

export function chatMiddleware() {
  return next => (action) => {
    if (socket && action.type === actions.ADD_MESSAGE) {
      socket.emit('message', action.message);
    }

    return next(action);
  };
}

export default function (store) {
  socket = io.connect(`${location.protocol}//${location.host}`);

  socket.on('start', (data) => {
    store.dispatch(actions.setUserId(data.userId));
  });

  socket.on('update-user-list', (data) => {
    store.dispatch(actions.updateUserList(data.users));
  });

  socket.on('message', (data) => {
    store.dispatch(actions.addResponse(data));
  });
}

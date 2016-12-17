import io from 'socket.io';
import r from 'rethinkdb';
import guid from './services/guid';

export default function (server) {
  r.connect({}).then((dbConnection) => {
    const socketServer = io(server);
    const connections = {};
    const users = {};

    r.table('chat_messages')
      .changes()
      .run(dbConnection)
      .then((cursor) => {
        cursor.each((err, row) => {
          if (!err) {
            Object.keys(connections).forEach((userId) => {
              const message = row.new_val;

              if (userId !== message.userId) {
                connections[userId].emit('message', message);
              }
            });
          }
        });
      });

    socketServer.on('connection', (socket) => {
      const userId = guid();
      connections[userId] = socket;

      socket.emit('start', { userId });
      socket.emit('update-user-list', users);

      socket.on('name', (name) => {
        users[userId] = { userId, name };
        socket.broadcast.emit('update-user-list', users);
      });

      socket.on('chat', (contactedUserId) => {
        const chatId = guid();
        const chat = {
          chatId,
          users: [contactedUserId, userId],
          messages: [],
        };
        socket.emit('create-new-chat', chat);
        connections[contactedUserId].emit('create-new-chat', chat);
      });

      socket.on('message', (data) => {
        r.table('chat_messages')
          .insert(data)
          .run(dbConnection);
      });

      socket.on('disconnect', () => {
        delete connections[userId];
        delete users[userId];
        socket.broadcast.emit('update-user-list', users);
      });
    });
  });
}

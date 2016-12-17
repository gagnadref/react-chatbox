import io from 'socket.io';
import r from 'rethinkdb';
import guid from './services/guid';

export default function (server) {
  r.connect({}).then((dbConnection) => {
    const socketServer = io(server);
    const connections = {};
    const users = [];

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
      users.push(userId);

      socket.emit('start', { userId });
      socket.emit('user_list', { users });

      socket.on('message', (data) => {
        r.table('chat_messages')
          .insert(data)
          .run(dbConnection);
      });

      socket.on('disconnect', () => {
        delete connections[userId];
        users.slice(userId, 1);
      });
    });
  });
}

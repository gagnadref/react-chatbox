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
      let userId;

      socket.on('join', (user) => {
        if (!user.userId) {
          userId = guid();
          socket.emit('setUserId', userId);
        } else {
          userId = user.userId;
        }

        connections[userId] = socket;
        users[userId] = { userId, name: user.name };
        socket.emit('updateUserList', users);
        socket.broadcast.emit('updateUserList', users);
      });

      socket.on('name', (name) => {
        users[userId] = { userId, name };
        socket.broadcast.emit('updateUserList', users);
      });

      socket.on('chat', (contactedUserId) => {
        const chatId = guid();
        const chat = {
          chatId,
          users: {
            [contactedUserId]: users[contactedUserId],
            [userId]: users[userId],
          },
          messages: [],
        };
        socket.emit('createNewChat', chat);
        connections[contactedUserId].emit('createNewChat', chat);
      });

      socket.on('message', (data) => {
        r.table('chat_messages')
          .insert(data)
          .run(dbConnection);
      });

      socket.on('disconnect', () => {
        delete connections[userId];
        delete users[userId];
        socket.broadcast.emit('updateUserList', users);
      });
    });
  });
}

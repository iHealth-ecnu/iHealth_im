var io = require('../node-v8.7.0-linux-x64/lib/node_modules/npm/node_modules/socket.io').listen(8080);
io.sockets.on('connection', function (socket) {
    socket.on('join',function(data){
        // 使发送 join 消息的用户加入对应 room
        socket.join(data.roomid);
        console.log('Join success!' + data.roomid);
    });
    socket.on('message', function (data) {
        // 接收发送过来的消息，和发送用户所处的 roomid
        var roomid = data.roomid;
        delete data.roomid;

        // 在 room 内广播，但是不广播给自己
        socket.broadcast.to(roomid).emit('message', data);
        console.log(data);
    });
});

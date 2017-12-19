var io = require('../node-v8.7.0-linux-x64/lib/node_modules/npm/node_modules/socket.io').listen(8080);
io.sockets.on('connection', function (socket) {
    socket.on('join',function(data){
        // 使发送 join 消息的用户加入对应 room
        socket.join(data.roomid);
        console.log('Join success!' + data.roomid);
    });
    socket.on('leave',function(data){
        // 使发送 leave 消息的用户离开对应 room
        socket.leave(data.roomid);
        console.log('Leave success!' + data.roomid);
    });
    socket.on('move',function(data){
        // 通知所有相关连接转移到新的聊天室
        socket.broadcast.emit('move', data);
        console.log('Let us move!' + data);
    });
    socket.on('message', function (data) {
        // 接收发送过来的消息，和发送用户所处的 roomid
        console.log(data);
        var roomid = data.roomid;
        delete data.roomid;

        // 在 room 内广播，但是不广播给自己
        socket.broadcast.to(roomid).emit('message', data);
        console.log(data);
    });
});

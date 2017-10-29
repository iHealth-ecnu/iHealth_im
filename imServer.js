var io = require('../node-v8.7.0-linux-x64/lib/node_modules/npm/node_modules/socket.io').listen(8080);
io.sockets.on('connection', function (socket) {
    socket.on('message', function (data) {
        var msg = data.msg;
        if (msg.search(/你好/) != -1 || msg.search(/你是谁/) != -1){
            msg = '你好啊，我是 iHealth 助手';
        }
        else if(msg.search(/我爱你/) != -1){
            msg = '我不爱你';
        }
        else if(msg.search(/什么名字/) != -1){
            msg = '你好，我是 iHealth 助手';
        }
        socket.emit('message',{
            'from' : '主机',
            'to' : '杨英明',
            'msg' : msg
        });
        console.log(data);
    });
});

var http = require("http");
var url = require("url");
var ws = require('websocket.io');

var server = ws.listen(9998, function () {
    console.log("WebSocket Server Started");
});


function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;

        route(handle, pathname, response, postData);

        // クライアントからの接続イベントを処理
        server.on("connection", function (socket) {
            // クライアントからのメッセージ受信イベントを処理
            socket.on("message", function (data) {
                // 実行時間を追加
                var data = JSON.parse(data);
                var d = new Date();
                data.time = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
                data = JSON.stringify(data);
                console.log("message:" + data);
                // 受信したメッセージを全てのクライアントに送信する
                server.clients.forEach(function (client) {
                    client.send(data);
                });
            });
        });
    }

    http.createServer(onRequest).listen(9999);
    console.log("Server has started.");
}

exports.start = start;
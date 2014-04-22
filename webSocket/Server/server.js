// 9999番ポートでクライアントの接続を待ち受ける
var ws = require('websocket.io');
var server = ws.listen(9999, function () {
  console.log("Server Started");
});
 
// クライアントからの接続イベントを処理
server.on("connection", function(socket) {
  // クライアントからのメッセージ受信イベントを処理
  socket.on("message", function(data) {
    // 実行時間を追加
    var data = JSON.parse(data);
    var d = new Date();
    data.time = d.getFullYear()  + "-" + (d.getMonth() + 1) + "-" + d.getDate() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    data = JSON.stringify(data);
    console.log("message:" + data);
    
    // 受信したメッセージを全てのクライアントに送信する
    server.clients.forEach(function(client) {
      client.send(data);
    });
  });
});
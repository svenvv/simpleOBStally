const WebSocket = require('ws');

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws, req) {
  const ip = req.headers['x-forwarded-for'].split(/\s*,\s*/)[0];
  ws.isAlive = true;
  ws.on('pong', heartbeat);
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

const interval = setInterval(function ping() {
  wss.clients.forEach(function each(ws) {
    if (ws.isAlive === false) return ws.terminate();

    ws.isAlive = false;
    ws.ping(noop);
  });
}, 5000);

wss.on('close', function close() {
  clearInterval(interval);
});
var http = require('http');
var fs = require('fs');
var ws = require('ws');

function send(res, mimeType, path) {
  res.writeHead(200, {'Content-Type': mimeType});
  res.end(fs.readFileSync(path));
}

var server = http.createServer(function(req, res) {
  if (req.method === 'GET') {
    switch (req.url) {
      case '/': case '/index.html': send(res, 'text/html', __dirname + '/index.html'); return;
      case '/three.min.js': send(res, 'application/javascript', __dirname + '/three.min.js'); return;
      case '/space_frigate_6.js': send(res, 'application/javascript', __dirname + '/space_frigate_6.js'); return;
      case '/space_frigate_6_color.png': send(res, 'image/png', __dirname + '/space_frigate_6_color.png'); return;
      case '/space_frigate_6_illumination.png': send(res, 'image/png', __dirname + '/space_frigate_6_illumination.png'); return;
      case '/space_frigate_6_specular.png': send(res, 'image/png', __dirname + '/space_frigate_6_specular.png'); return;
      case '/terrain.png': send(res, 'image/png', __dirname + '/terrain.png'); return;
    }
  }

  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('404 Not Found');
});

var wss = new ws.Server({server: server});

wss.on('connection', function(socket) {
  socket.on('message', function(message) {
    wss.clients.forEach(function(client) {
      client.send(message);
    });
  });
});

server.listen(8123);
console.log('serving on http://localhost:8123/');

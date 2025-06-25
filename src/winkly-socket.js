// === winkly-socket.js ===
const WebSocket = require("ws");
const http = require("http");
const url = require("url");

const server = http.createServer();
const wss = new WebSocket.Server({ noServer: true });

const rooms = {}; // roomId: [ws, ws]

wss.on("connection", (ws, request, client) => {
  const { pathname } = url.parse(request.url, true);
  const roomId = pathname.split("/").pop();

  if (!rooms[roomId]) rooms[roomId] = [];
  rooms[roomId].push(ws);

  ws.on("message", (message) => {
    const data = JSON.parse(message);
    for (let client of rooms[roomId]) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(data));
      }
    }
  });

  ws.on("close", () => {
    rooms[roomId] = rooms[roomId].filter((s) => s !== ws);
    if (rooms[roomId].length === 0) delete rooms[roomId];
  });
});

server.on("upgrade", (req, socket, head) => {
  const pathname = url.parse(req.url).pathname;
  if (pathname.startsWith("/room/")) {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  } else {
    socket.destroy();
  }
});

server.listen(8080, () => console.log("✅ Socket server running on ws://localhost:8080"));

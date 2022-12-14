const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    //Http Server
    this.server = http.createServer(this.app);
    //Configuracion de sockets
    this.io = socketio(this.server, {
      cors: {
        origin: "*",
        methods: ["GET", "POST"],
      },
    });
  }
  middlewares() {
    //Desplegar el directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));
    // this.app.use(cors());
  }

  configurarSockets() {
    new Sockets(this.io);
  }

  execute() {
    //Inicializar middlewares
    this.middlewares();
    //Inicializar sockets
    this.configurarSockets();
    //Inicializar server
    this.server.listen(this.port, () => {
      console.log("Server corriendo en puerto", this.port);
    });
  }
}

module.exports = Server;

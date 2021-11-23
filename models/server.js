const express = require("express");
const cors = require("cors");
const dbConnection = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      usuariosPath: "/api/usuarios",
      authPath: "/api/auth",
      categoriasPath: "/api/categorias",
      productosPath: "/api/productos",
      buscarPath: "/api/buscar",
    };
    //Database
    this.conectarDb();
    //Middlewares
    this.middlewares();
    //Rutas de la aplicacion
    this.routes();
  }

  async conectarDb() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.paths.usuariosPath, require("../routes/user"));
    this.app.use(this.paths.authPath, require("../routes/auth"));
    this.app.use(this.paths.categoriasPath, require("../routes/categorias"));
    this.app.use(this.paths.productosPath, require("../routes/productos"));
    this.app.use(this.paths.buscarPath, require("../routes/buscar"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto: ", this.port);
    });
  }
}

module.exports = Server;

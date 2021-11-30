const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");
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
      cargar: "/api/cargar",
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

    //Fileupload - Carga de archivos
    this.app.use(
      fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        createParentPath: true,
      })
    );
  }

  routes() {
    this.app.use(this.paths.usuariosPath, require("../routes/user"));
    this.app.use(this.paths.authPath, require("../routes/auth"));
    this.app.use(this.paths.categoriasPath, require("../routes/categorias"));
    this.app.use(this.paths.productosPath, require("../routes/productos"));
    this.app.use(this.paths.buscarPath, require("../routes/buscar"));
    this.app.use(this.paths.cargar, require("../routes/uploads"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto: ", this.port);
    });
  }
}

module.exports = Server;

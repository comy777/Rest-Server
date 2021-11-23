const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearProducto,
  obtenerProducto,
  obtenerProductos,
  eliminarProducto,
  actualizarProducto,
} = require("../controllers/productos");
const {
  existeIdCategoria,
  existeIdProducto,
} = require("../helpers/existeCategoria");
const { validarToken } = require("../middlewares/validarjwt");
const { validarRol } = require("../middlewares/validarRol");
const { validation } = require("../middlewares/validation");

const router = Router();

//Obtener todas la categorias
router.get("/", obtenerProductos);

//Obtener una categoria por id
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeIdProducto),
    validation,
  ],
  obtenerProducto
);

//Crear categoria - privado - cualquier token
router.post(
  "/",
  [
    validarToken,
    check("nombre", "El nombre es oblogatorio").notEmpty(),
    check("categoria", "No es un id de mongo valido").isMongoId(),
    check("categoria").custom(existeIdCategoria),
    validation,
  ],
  crearProducto
);

//Actualizar registro por id
router.put(
  "/:id",
  [
    validarToken,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeIdProducto),
    validation,
  ],
  actualizarProducto
);

//Eliminar registro
router.delete(
  "/:id",
  [
    validarToken,
    validarRol,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeIdProducto),
    validation,
  ],
  eliminarProducto
);

module.exports = router;

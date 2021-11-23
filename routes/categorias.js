const { Router } = require("express");
const { check } = require("express-validator");
const {
  crearCategoria,
  obtenerCategoria,
  obtenerCategorias,
  actualizarCategoria,
  eliminarCategoria,
} = require("../controllers/categorias");
const { existeIdCategoria } = require("../helpers/existeCategoria");
const { validarToken } = require("../middlewares/validarjwt");
const { validarRol } = require("../middlewares/validarRol");
const { validation } = require("../middlewares/validation");

const router = Router();

//Obtener todas la categorias
router.get("/", obtenerCategorias);

//Obtener una categoria por id
router.get(
  "/:id",
  [
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeIdCategoria),
    validation,
  ],
  obtenerCategoria
);

//Crear categoria - privado - cualquier token
router.post(
  "/",
  [
    validarToken,
    check("nombre", "El nombre es oblogatorio").notEmpty(),
    validation,
  ],
  crearCategoria
);

//Actualizar registro por id
router.put(
  "/:id",
  [
    validarToken,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeIdCategoria),
    check("nombre", "Nombre requerido").notEmpty(),
    validation,
  ],
  actualizarCategoria
);

//Eliminar registro
router.delete(
  "/:id",
  [
    validarToken,
    validarRol,
    check("id", "No es un id de mongo valido").isMongoId(),
    check("id").custom(existeIdCategoria),
    validation,
  ],
  eliminarCategoria
);

module.exports = router;

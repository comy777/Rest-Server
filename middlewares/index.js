const validation = require("../middlewares/validation");
const validarToken = require("../middlewares/validarjwt");
const tieneRol = require("../middlewares/validarRol");
const validarArchivo = require("./validarArchivo");

module.exports = {
  ...validation,
  ...validarToken,
  ...tieneRol,
  ...validarArchivo,
};

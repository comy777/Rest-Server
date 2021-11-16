const validation = require("../middlewares/validation");
const validarToken = require("../middlewares/validarjwt");
const tieneRol = require("../middlewares/validarRol");

module.exports = {
  ...validation,
  ...validarToken,
  ...tieneRol,
};

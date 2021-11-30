const dbValidation = require("./dbValidation");
const existeCategoria = require("./existeCategoria");
const googleVerify = require("./google-verify");
const subirArchivos = require("./subirArchivos");

module.exports = {
  ...dbValidation,
  ...existeCategoria,
  ...googleVerify,
  ...subirArchivos,
};

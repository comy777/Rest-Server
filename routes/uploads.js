const { Router } = require("express");
const {
  cargarArchivos,
  actualizarImagen,
  obtenerImagenes,
  actualizarImagenCloudinary,
} = require("../controllers/uploads");
const { check } = require("express-validator");
const { validation, validarArchivo } = require("../middlewares");
const { coleccionesPermitidas } = require("../helpers");

const router = Router();

router.post("/", validarArchivo, cargarArchivos);

router.put(
  "/:coleccion/:id",
  [
    validarArchivo,
    check("id", "El id debe ser de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validation,
  ],
  //actualizarImagen
  actualizarImagenCloudinary
);

router.get(
  "/:coleccion/:id",
  [
    check("id", "No es un id de mongo").isMongoId(),
    check("coleccion").custom((c) =>
      coleccionesPermitidas(c, ["usuarios", "productos"])
    ),
    validation,
  ],
  obtenerImagenes
);

module.exports = router;

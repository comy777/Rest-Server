const { Router } = require("express");
const { check } = require("express-validator");
const { authLogin } = require("../controllers/auth");
const { validation } = require("../middlewares/validation");

const router = Router();

router.post(
  "/login",
  [
    check("correo", "Correo requerido").isEmail(),
    check("password", "Contraseña requerida").notEmpty(),
    validation,
  ],
  authLogin
);

module.exports = router;

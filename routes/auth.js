const { Router } = require("express");
const { check } = require("express-validator");
const { authLogin } = require("../controllers/auth");
const { googleSignin } = require("../controllers/auth");
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

router.post(
  "/google",
  [check("id_token", "Token requerido").notEmpty(), validation],
  googleSignin
);

module.exports = router;

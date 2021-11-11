const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
} = require("../controllers/user");
const Role = require("../models/role");
const { validation } = require("../middlewares/validation");
const {
  rolValidation,
  existeEmail,
  existeId,
} = require("../helpers/dbValidation");
const router = Router();

router.get("/", usuariosGet);
router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeId),
    check("rol").custom(rolValidation),
    validation,
  ],
  usuariosPut
);
router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("correo", "El correo no es valido").isEmail(),
    check("correo").custom(existeEmail),
    check("password", "La contraseña debe tener mas de 6 caracteres").isLength(
      7
    ),
    //check("rol", "No es un rol valido").isIn("ADMIN_ROLE", "USER_ROLE"),
    check("rol").custom(rolValidation),
    validation,
  ],
  usuariosPost
);
router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(existeId),
    validation,
  ],
  usuariosDelete
);

module.exports = router;

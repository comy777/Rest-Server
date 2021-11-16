const { request, response } = require("express");

const validarRol = async (req = request, res = response, next) => {
  if (!req.user) {
    res.status(500).json({
      msg: "Se quiere verificar el rol sin validar el token",
    });
  }
  const { rol, nombre } = req.user;
  if (rol !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `El usuario ${nombre} no es administrador`,
    });
  }
  next();
};

const tieneRol = (...roles) => {
  return (req = request, res = response, next) => {
    const { rol } = req.user;
    if (!roles.includes(rol)) {
      return res.status(401).json({
        msg: `El servicio require uno de estos roles ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  validarRol,
  tieneRol,
};

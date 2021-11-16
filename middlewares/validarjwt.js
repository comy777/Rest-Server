const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const validarToken = async (req = request, res = response, next) => {
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }
  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    //Leer usuario
    const id = uid;
    const user = await User.findById(id);
    if (!user) {
      return res.status(401).json({
        msg: "Usuario no registrado",
      });
    }
    if (!user.estado) {
      return res.status(401).json({
        msg: "Token no valido, usuario no activo",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarToken,
};

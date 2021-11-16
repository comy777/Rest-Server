const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../jwt/jwt");

const authLogin = async (req = request, res = response) => {
  const { correo, password } = req.body;
  try {
    const user = await User.findOne({ correo });
    //Verificar si esta registrado
    if (!user) {
      return res.status(400).json({
        msg: "Usuario no registrado",
      });
    }
    //Verificar estado
    if (!user.estado) {
      return res.json({
        msg: "Usuario no activo",
      });
    }
    //Verificar correo y contraseña
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.json({
        msg: "Usuario y password no coinciden",
      });
    }
    //Generar token
    const token = generateToken(user.id);
    const { _id, ...resto } = user;
    res.json({
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  authLogin,
};

const { request, response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const { generateToken } = require("../jwt/jwt");
const { googleVerify } = require("../helpers/google-verify");

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

const googleSignin = async (req = request, res = response) => {
  const { id_token } = req.body;
  try {
    const { correo, nombre, img } = await googleVerify(id_token);
    let user = await User.findOne({ correo });
    if (!user) {
      const data = {
        nombre,
        correo,
        password: "1234567",
        img,
        google: true,
      };
      user = new User(data);
      await user.save();
    }
    if (!user.estado) {
      return res.status(401).json({
        msg: "Comuniquese con el administrador",
      });
    }
    const token = generateToken(user.id);
    res.json({
      msg: "Token ok! google signin",
      token,
    });
  } catch (error) {
    res.status(400).json({
      msg: "Token no valido",
    });
  }

  // If request specified a G Suite domain:
  // const domain = payload['hd'];
};

module.exports = {
  authLogin,
  googleSignin,
};

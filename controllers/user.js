const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  // const usuarios = await User.find(query)
  //   .skip(Number(desde))
  //   .limit(Number(limite));
  // const total = await User.count(query);
  const [total, usuarios] = await Promise.all([
    User.count(query),
    User.find(query).skip(Number(desde)).limit(Number(limite)),
  ]);
  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req = request, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  // validation(req, res);
  const user = new User({ nombre, correo, password, rol });
  //Verificar si el correo existe

  //Encriptar contraseña
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);
  await user.save();
  res.json({
    user,
  });
};

const usuariosPut = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;
  if (password) {
    const salt = bcrypt.genSaltSync();
    resto.password = bcrypt.hashSync(password, salt);
  }
  const user = await User.findByIdAndUpdate(id, resto);
  res.json({
    user,
  });
};

const usuariosDelete = async (req = request, res = response) => {
  const { id } = req.params;
  const { user } = req;
  //const usuario = await User.findByIdAndDelete(id);
  const usuario = await User.findByIdAndUpdate(id, { estado: false });
  res.json({ usuario, user });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosDelete,
};

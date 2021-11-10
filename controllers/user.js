const { response, request } = require("express");

const usuariosGet = (req = request, res = response) => {
  //const params = req.query
  res.status(200).json({
    msg: "api get",
  });
};

const usuariosPost = (req = request, res = response) => {
  res.status(200).json({
    msg: "api post",
  });
};

const usuariosPut = (req = request, res = response) => {
  const { id } = req.params;
  res.status(200).json({
    msg: "api put",
    id,
  });
};

const usuariosPatch = (req = request, res = response) => {
  res.status(200).json({
    msg: "api patch",
  });
};

const usuariosDelete = (req = request, res = response) => {
  res.status(200).json({
    msg: "api delete",
  });
};

module.exports = {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
};

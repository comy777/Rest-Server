const { request, response } = require("express");
const Categoria = require("../models/Categoria");

const obtenerCategorias = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, categorias] = await Promise.all([
    Categoria.count(query),
    Categoria.find(query)
      .populate("usuario", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);
  res.json({
    total,
    categorias,
  });
};

const obtenerCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findById(id).populate("usuario", "nombre");
  res.status(200).json({
    categoria,
  });
};

const actualizarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.user._id;
  const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json({
    categoria,
  });
};

const crearCategoria = async (req = request, res = response) => {
  const nombre = req.body.nombre.toUpperCase();
  const categoriaDb = await Categoria.findOne({ nombre });
  if (categoriaDb) {
    return res.status(400).json({
      msg: `La categoria ${categoriaDb.nombre}, ya existe`,
    });
  }
  const data = {
    nombre,
    usuario: req.user._id,
  };

  const categoria = await new Categoria(data);
  await categoria.save();
  res.status(201).json({
    msg: "Categoria guardada",
  });
};

const eliminarCategoria = async (req = request, res = response) => {
  const { id } = req.params;
  const categoria = await Categoria.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.status(200).json({
    categoria,
  });
};

module.exports = {
  obtenerCategorias,
  obtenerCategoria,
  actualizarCategoria,
  crearCategoria,
  eliminarCategoria,
};

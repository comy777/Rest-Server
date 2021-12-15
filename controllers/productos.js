const { request, response } = require("express");
const Producto = require("../models/Producto");

const obtenerProductos = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;
  const query = { estado: true };
  const [total, productos] = await Promise.all([
    Producto.count(query),
    Producto.find(query)
      .populate("usuario", "nombre")
      .populate("categoria", "nombre")
      .skip(Number(desde))
      .limit(Number(limite)),
  ]);
  res.json({
    total,
    productos,
  });
};

const obtenerProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");
  res.status(200).json(producto);
};

const actualizarProducto = async (req = request, res = response) => {
  const { id, categoria } = req.params;
  const { estado, usuario, ...data } = req.body;
  if (data.nombre) {
    data.nombre = data.nombre.toUpperCase();
  }
  data.usuario = req.user._id;
  const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
  res.status(200).json({
    producto,
  });
};

const crearProducto = async (req = request, res = response) => {
  const { estado, usuario, ...body } = req.body;
  const productoDb = await Producto.findOne({ nombre: body.nombre });
  if (productoDb) {
    return res.status(400).json({
      msg: `El producto ${productoDb.nombre}, ya existe`,
    });
  }
  const data = {
    ...body,
    nombre: body.nombre.toUpperCase(),
    usuario: req.user._id,
  };

  const producto = await new Producto(data);
  await producto.save();
  res.status(201).json({
    msg: "Producto guardado",
  });
};

const eliminarProducto = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false },
    { new: true }
  );
  res.status(200).json({
    producto,
  });
};

module.exports = {
  obtenerProductos,
  obtenerProducto,
  actualizarProducto,
  eliminarProducto,
  crearProducto,
};

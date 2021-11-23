const Categoria = require("../models/Categoria");
const Producto = require("../models/Producto");

const existeIdCategoria = async (id = "") => {
  console.log(id);
  const existeUserId = await Categoria.findById(id);
  if (!existeUserId) {
    throw new Error(`La categoria no existe`);
  }
};

const existeIdProducto = async (id = "") => {
  const existeUserId = await Producto.findById(id);
  if (!existeUserId) {
    throw new Error(`El producto no existe`);
  }
};

module.exports = {
  existeIdCategoria,
  existeIdProducto,
};

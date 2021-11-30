const Role = require("../models/role");
const User = require("../models/User");

const rolValidation = async (rol = "") => {
  const existeRol = await Role.findOne({ rol });
  if (!existeRol) {
    throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
  }
};

const existeEmail = async (correo = "") => {
  const email = await User.findOne({ correo });
  if (email) {
    throw new Error(`El correo ${correo} ya se encuentra registrado`);
  }
};

const existeId = async (id = "") => {
  const existeUserId = await User.findById(id);
  if (!existeUserId) {
    throw new Error(`El usuario con ${id} no existe`);
  }
};

const coleccionesPermitidas = (coleccion = "", colecciones = []) => {
  const incluida = colecciones.includes(coleccion);
  if (!incluida) {
    throw new Error(
      `La coleccion ${coleccion} no es permitida, ${colecciones}`
    );
  }
  return true;
};

module.exports = {
  rolValidation,
  existeEmail,
  existeId,
  coleccionesPermitidas,
};

const path = require("path");
const fs = require("fs");
const { request, response } = require("express");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { subirArchivos } = require("../helpers");
const Producto = require("../models/Producto");
const User = require("../models/User");

const cargarArchivos = async (req = request, res = response) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ msg: "No files were uploaded." });
  }
  if (!req.files.archivo) {
    return res.status(400).json({ msg: "No files were uploaded." });
  }
  //Imagenes
  try {
    //const nombre = await subirArchivos(req.files, ["txt", "md"], "textos");
    const nombre = await subirArchivos(req.files, undefined, "images");
    res.status(200).json({
      nombre,
    });
  } catch (msg) {
    res.status(400).json({
      msg,
    });
  }
};

const actualizarImagen = async (req = request, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `Usuario no registrado`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto`,
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: "Se me olvido validar esto",
      });
  }
  //Limpiar imagenes previas
  try {
    if (modelo.img) {
      //Borrar imagen del servidor
      const pathImagen = path.join(
        __dirname,
        "../uploads",
        coleccion,
        modelo.img
      );
      if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
      }
    }
    const nombre = await subirArchivos(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();
    res.json(modelo);
  } catch (error) {
    res.status(500).json({
      msg: "Error del servidor",
    });
  }
};

const actualizarImagenCloudinary = async (req = request, res = response) => {
  const { coleccion, id } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `Usuario no registrado`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto`,
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: "Se me olvido validar esto",
      });
  }
  //Limpiar imagenes previas
  if (modelo.img) {
    //Borrar imagen del servidor
    const nombreArr = modelo.img.split("/");
    const nombre = nombreArr[nombreArr.length - 1];
    const [public_id] = nombre.split(".");
    cloudinary.uploader.destroy(public_id);
  }
  const { tempFilePath } = req.files.archivo;
  const resp = await cloudinary.uploader.upload(tempFilePath);
  //const nombre = await subirArchivos(req.files, undefined, coleccion);
  const { secure_url } = resp;
  modelo.img = secure_url;
  await modelo.save();
  res.json(resp);
};

const obtenerImagenes = async (req = request, res = response) => {
  const { id, coleccion } = req.params;
  let modelo;
  switch (coleccion) {
    case "usuarios":
      modelo = await User.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `Usuario no registrado`,
        });
      }
      break;
    case "productos":
      modelo = await Producto.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto`,
        });
      }
      break;
    default:
      return res.status(500).json({
        msg: "Se me olvido validar esto",
      });
  }
  //Limpiar imagenes previas
  if (modelo.img) {
    //Borrar imagen del servidor
    const pathImagen = path.join(
      __dirname,
      "../uploads",
      coleccion,
      modelo.img
    );
    if (fs.existsSync(pathImagen)) {
      return res.status(200).sendFile(pathImagen);
    }
  }
  const pathImage = path.join(__dirname, "../assets/no-image.jpg");
  res.sendFile(pathImage);
};

module.exports = {
  cargarArchivos,
  actualizarImagen,
  obtenerImagenes,
  actualizarImagenCloudinary,
};

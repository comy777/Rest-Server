const { v4: uuidv4 } = require("uuid");
const path = require("path");

const subirArchivos = (
  files,
  extensionesValidas = ["png", "jpeg", "jpg", "gif"],
  carpeta = ""
) => {
  return new Promise((resolve, reject) => {
    const { archivo } = files;
    const nombreCortado = archivo.name.split(".");
    const extension = nombreCortado[nombreCortado.length - 1];
    //Validar la extension
    if (!extensionesValidas.includes(extension)) {
      reject(`La extension ${extension} no es permitidad`);
    }
    const nomTemp = uuidv4() + "." + extension;
    const uploadPath = path.join(__dirname, "../uploads/", carpeta, nomTemp);
    archivo.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(nomTemp);
    });
  });
};

module.exports = {
  subirArchivos,
};

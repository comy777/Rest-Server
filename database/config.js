const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    const url = process.env.MONGODB_CNN;
    await mongoose.connect(url);
    console.log("Conexion a la base de datos exitosa");
  } catch (error) {
    throw new Error("Error a la hora de iniciar la base de datos");
  }
};

module.exports = dbConnection;

const { model, Schema } = require("mongoose");

const UserSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
  },
  correo: {
    type: String,
    unique: true,
    required: [true, "El correo es obligatorio"],
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"],
  },
  img: {
    type: String,
  },
  rol: {
    type: String,
    required: [true, "El rol es obligatorio"],
    enum: ["ADMIN_ROLE", "VENTAS_ROLE"],
  },
  estado: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, password, ...user } = this.toObject();
  return user;
};

module.exports = model("user", UserSchema);

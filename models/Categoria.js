const { Schema, model } = require("mongoose");

const CategoriaSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    unique: true,
  },
  estado: {
    type: Boolean,
    default: true,
    required: true,
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

CategoriaSchema.methods.toJSON = function () {
  const { __v, _id, ...categoria } = this.toObject();
  return categoria;
};

module.exports = model("categorias", CategoriaSchema);
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user", // Valor por defecto para el rol
  },
});

// Middleware para cifrar la contraseña antes de guardar
userSchema.pre("save", async function (next) {
  // Solo cifrar si la contraseña ha sido modificada
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Middleware para convertir el rol a minúsculas antes de guardar
userSchema.pre("save", function (next) {
  if (this.role) {
    this.role = this.role.toLowerCase(); // Convertir el rol a minúsculas
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;

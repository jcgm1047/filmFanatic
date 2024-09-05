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
    default: "User",
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

// Middleware para normalizar el rol antes de guardar
userSchema.pre("save", function (next) {
  if (this.role) {
    // Asegúrate de que el rol siempre comience con mayúscula
    this.role =
      this.role.charAt(0).toUpperCase() + this.role.slice(1).toLowerCase();
  }
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

const express = require("express");
const User = require("../model/user");
const router = express.Router();

// Obtener todos los perfiles
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo perfil
router.post("/", async (req, res) => {
  const { username, email, role, password } = req.body;

  // Log para verificar los datos recibidos
  console.log("Datos recibidos en el servidor:", req.body);

  if (!username || !email || !role || !password) {
    return res
      .status(400)
      .json({ message: "Todos los campos son obligatorios" });
  }

  try {
    const newUser = new User({ username, email, role, password });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un perfil
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Eliminar un perfil
router.delete("/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Perfil eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

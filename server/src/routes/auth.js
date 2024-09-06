const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const bcrypt = require("bcryptjs");
const router = express.Router();

// Registro de usuario
router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  try {
    // Verificar si el nombre de usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El correo ya está en uso" });
    }

    // Crear el usuario
    const user = await User.create({
      username,
      email,
      password,
    });

    // Generar token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h", // Token válido por 1 hora
      }
    );

    // Devolver el token y el rol en la respuesta
    res.status(201).json({ token, role: user.role });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(400).json({ error: error.message });
  }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Credenciales incorrectas" });
    }

    const token = jwt.sign(
      { id: user._id, email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.json({ token, role: user.role }); // Enviar el rol del usuario junto con el token
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
});

// Ruta protegida para obtener el perfil del usuario actual
router.get("/me", async (req, res) => {
  // Extraer el token del encabezado de la solicitud
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "No autorizado" });

  try {
    // Verificar el token con la clave secreta
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Encontrar el usuario en la base de datos, excluyendo la contraseña
    const user = await User.findById(decoded.id).select("-password");

    // Verificar si el usuario existe y devolver su información
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    // Devolver el perfil del usuario, incluyendo el rol
    res.json(user);
  } catch (error) {
    console.error("Error al verificar el token:", error);
    res.status(401).json({ error: "Token no válido" });
  }
});

// Obtener todos los perfiles
router.get("/profiles", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Crear un nuevo perfil
router.post("/profiles", async (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    role: req.body.role,
    password: req.body.password, // Manejo de contraseñas en entorno real debe ser seguro
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Actualizar un perfil
router.put("/profiles/:id", async (req, res) => {
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
router.delete("/profiles/:id", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "Perfil eliminado" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

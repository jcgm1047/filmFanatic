const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

// Cargar variables de entorno desde .env
dotenv.config();

const PORT = process.env.PORT_BACKEND || 3000;
// Conectar a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Importar rutas
const apiRouter = require("./api"); // Asegúrate de que la ruta aquí es correcta
const authRoutes = require("./routes/auth"); // Importa las rutas de autenticación
const profileRoutes = require("./routes/profileRoutes"); // Ruta de perfiles

// Middleware
app.use(cors());
app.use(express.json());

// Montar rutas
app.use("/api", apiRouter); // Monta el router en la ruta base '/api'
app.use("/api/auth", authRoutes); // Monta las rutas de autenticación en '/api/auth'
app.use("/api/profiles", profileRoutes);

// Simulador de almacenamiento en memoria para comentarios
let commentsByMovieId = {}; // Almacena comentarios por ID de película

// Rutas para manejar comentarios
app.post("/api/comments/:movieId", (req, res) => {
  const { movieId } = req.params;
  const comment = req.body.comment;
  if (comment.length > 200) {
    return res.status(400).send("Comment must be less than 200 characters");
  }

  if (!commentsByMovieId[movieId]) {
    commentsByMovieId[movieId] = [];
  }

  commentsByMovieId[movieId].push(comment);
  res.status(201).send("Comment added");
});

app.get("/api/comments/:movieId", (req, res) => {
  const { movieId } = req.params;
  res.json(commentsByMovieId[movieId] || []);
});

// Iniciar el servidor
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

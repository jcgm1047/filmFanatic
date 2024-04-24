const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const apiRouter = require("./api"); // Asegúrate de que la ruta aquí es correcta

let commentsByMovieId = {}; // Almacena comentarios por ID de película

app.use(cors());
app.use(express.json());
app.use("/api", apiRouter); // Monta el router en la ruta base '/api'

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

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);

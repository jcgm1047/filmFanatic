const express = require("express");
const router = express.Router();
const axios = require("axios");

const API_KEY = "fa0ef6f99f8264ea23ba09f92fcd8eaa";

router.get("/movies", async (req, res) => {
  const { search, genre, year } = req.query;
  let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=es`;

  if (search) {
    url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=es&query=${encodeURIComponent(
      search
    )}`;
  }

  if (genre) {
    url += `&with_genres=${encodeURIComponent(genre)}`;
  }
  if (year && !isNaN(year)) {
    // Asegurarse que el año sea un número
    url += `&primary_release_year=${encodeURIComponent(year)}`;
  }

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Error fetching movies");
  }
});

module.exports = router;

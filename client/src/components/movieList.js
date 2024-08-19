import React, { useEffect, useState } from "react";
import MovieCard from "./movieCard";
import MovieDetails from "./movieDetail"; // Asegúrate que el nombre de la importación coincide con tu archivo
import SearchBar from "./searchBar";
import Filters from "./filter";
import Footer from "./footer"; // Importa el nuevo componente Footer
import axios from "axios";
import AuthModal from "./authModal"; // Asegúrate de que la ruta es correcta

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({ genre: "", year: "" });

  useEffect(() => {
    const fetchMovies = () => {
      let query = `?`;
      if (searchTerm) query += `search=${encodeURIComponent(searchTerm)}&`;
      if (filters.genre) query += `genre=${encodeURIComponent(filters.genre)}&`;
      if (filters.year && filters.year !== "")
        query += `year=${encodeURIComponent(filters.year)}`;
      if (query.endsWith("&")) query = query.slice(0, -1);

      axios
        .get(`http://localhost:3000/api/movies${query}`)
        .then((response) => {
          setMovies(response.data.results);
        })
        .catch((error) => console.error("Error fetching movies:", error));
    };

    fetchMovies();
  }, [searchTerm, filters]);

  const handleSearch = (search) => {
    setSearchTerm(search);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleMovieSelect = (movieId) => {
    setSelectedMovieId(movieId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="flex-container">
        {" "}
        {/* CAMBIO */}
        <Filters onFilterChange={handleFilterChange} /> {/* CAMBIO */}
        <SearchBar onSearch={handleSearch} /> {/* CAMBIO */}
      </div>{" "}
      <div className="App">
        <h1>Bienvenido a FilmFanatic</h1>
        <AuthModal />
      </div>
      {/* CAMBIO */}
      <div className="container">
        <div className="row">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={() => handleMovieSelect(movie.id)}
            />
          ))}
          {selectedMovieId && showModal && (
            <MovieDetails
              show={showModal}
              onHide={handleCloseModal}
              movieId={selectedMovieId}
            />
          )}
        </div>
      </div>
      <Footer /> {/* CAMBIO: Añade el componente Footer al final */}
    </div>
  );
}

export default MovieList;

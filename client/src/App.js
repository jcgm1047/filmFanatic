import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegura que Bootstrap está importado
import MovieList from "./components/movieList"; // Asegúrate de que la ruta es correcta

function App() {
  return (
    <div className="App">
      <h1>Películas Populares</h1>
      <MovieList />
    </div>
  );
}

export default App;

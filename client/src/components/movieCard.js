import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Asegura que Bootstrap está importado

function MovieCard({ movie, onClick }) {
  return (
    <div
      className="col-6 col-sm-4 col-md-3" // Cambiar aquí para diferentes tamaños en móvil, tablet y desktop
      onClick={() => onClick(movie.id)}
    >
      <div className="card" style={{ width: "100%" }}>
        {" "}
        {/* Asegurar que la tarjeta ocupa todo el espacio de la columna */}
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          className="card-img-top"
          alt={movie.title}
        />
        <div className="card-body">
          <h5 className="card-title">{movie.title}</h5>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;

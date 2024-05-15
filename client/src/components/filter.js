import React, { useState } from "react";
import styles from "./styles/filters.module.scss"; // Importa los estilos

function Filters({ onFilterChange }) {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1899 },
    (v, k) => currentYear - k
  ); // Genera un array desde 1900 hasta el año actual

  const handleSubmit = (event) => {
    event.preventDefault();
    if (year >= 1900 && year <= new Date().getFullYear()) {
      onFilterChange({ genre, year });
    } else {
      alert("Please select a valid year");
    }
  };
  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      {" "}
      <div className="col-auto">
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className={styles.formSelect}
        >
          <option value="">Seleccionar el género</option>
          <option value="28">Acción</option>
          <option value="35">Comedia</option>
          <option value="18">Drama</option>
          <option value="27">Horror</option>
          <option value="878">Ciencia Ficción</option>
          <option value="14">Fantasía</option>
          <option value="53">Thriller</option>
          <option value="10749">Romance</option>
          <option value="99">Documentales</option>
          <option value="12">Aventuras</option>
          <option value="10402">Musical</option>
          <option value="16">Animación</option>
          <option value="9648">Misterio</option>
          <option value="10752">Guerra</option>
          <option value="37">Western</option>
        </select>
      </div>
      <div className="col-auto">
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className={styles.formSelect}
        >
          <option value="">Seleccionar el año</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-primary">
          Filtrar
        </button>
      </div>
    </form>
  );
}

export default Filters;

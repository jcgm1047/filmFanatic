import React, { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form
      onSubmit={handleSearch}
      className="d-flex justify-content-center my-2"
    >
      <input
        type="text"
        placeholder="Buscar películas"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control me-2"
        style={{ maxWidth: "300px" }} // Controla el ancho máximo en pantallas grandes
      />
      <button type="submit" className="btn btn-dark">
        <FaMagnifyingGlass />
      </button>
    </form>
  );
}

export default SearchBar;

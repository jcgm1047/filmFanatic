import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import axios from "axios"; // Importar axios para realizar la solicitud
import Filters from "./filter";
import SearchBar from "./searchBar";
import AuthModal from "./authModal"; // Asegúrate de que la ruta es correcta

function Header({ onFilterChange, onSearch }) {
  const [tokenValidity, setTokenValidity] = useState(null); // Estado para guardar la validez del token

  useEffect(() => {
    // Función para verificar la validez del token llamando a auth/me
    const checkTokenValidity = async () => {
      const token = localStorage.getItem("token"); // Obtener el token del localStorage
      if (token) {
        try {
          // Realizar la solicitud a auth/me
          const response = await axios.get(
            "http://localhost:3000/api/auth/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setTokenValidity(true); // Si la solicitud es exitosa, el token es válido
        } catch (error) {
          setTokenValidity(false); // Si hay un error, el token no es válido
        }
      } else {
        setTokenValidity(false); // Si no hay token, marcar como no válido
      }
    };

    checkTokenValidity(); // Llamar a la función al montar el componente
  }, []); // Se ejecuta una sola vez al montar el componente

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">FilmFanatic</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto d-flex align-items-center">
            <div className="d-flex align-items-center me-3">
              <Filters onFilterChange={onFilterChange} />
            </div>
            <div className="d-flex align-items-center me-3">
              <SearchBar onSearch={onSearch} />
            </div>
            <div className="d-flex align-items-center">
              {tokenValidity ? null : <AuthModal />}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

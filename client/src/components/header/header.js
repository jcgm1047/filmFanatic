import React, { useEffect, useState } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Filters from "./filter/filter";
import SearchBar from "./searchBar";
import AuthModal from "../auth/authModal";

function Header({ onFilterChange, onSearch }) {
  const [tokenValidity, setTokenValidity] = useState(null);
  const navigate = useNavigate(); // Hook para redirigir

  // Función para verificar si el token es válido
  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTokenValidity(true); // Token válido
      } catch (error) {
        setTokenValidity(false); // Token no válido
      }
    } else {
      setTokenValidity(false); // No hay token
    }
  };

  useEffect(() => {
    checkTokenValidity(); // Verifica el token al montar el componente
  }, []);

  const handleLogout = () => {
    // Eliminar token y rol del localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    // Actualizar el estado para mostrar "Iniciar Sesión"
    setTokenValidity(false);

    // Redirigir a la página principal
    navigate("/");
  };

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
              {tokenValidity ? (
                // Mostrar botón de cerrar sesión si el token es válido
                <Button variant="dark" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              ) : (
                // Mostrar botón de iniciar sesión si no hay token
                <AuthModal onSuccessfulLogin={checkTokenValidity} />
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

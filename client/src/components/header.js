import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import Filters from "./filter";
import SearchBar from "./searchBar";
import AuthModal from "./authModal"; // Asegúrate de que la ruta es correcta

function Header({ onFilterChange, onSearch }) {
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
              <AuthModal />
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

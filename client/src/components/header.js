import React from "react";
import { Container, /* Row */ /* Col, */ Navbar, Nav } from "react-bootstrap";
import SearchBar from "./searchBar"; // Asegúrate de importar tu SearchBar
import Filters from "./filter"; // Importar los filtros
import { Link } from "react-router-dom"; // Para la navegación

function Header() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src="/path-to-your-logo.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <SearchBar />
          </Nav>
          <Filters />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

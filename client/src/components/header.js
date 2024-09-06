import React, { useState, useEffect } from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import axios from "axios";
import Filters from "./filter";
import SearchBar from "./searchBar";
import AuthModal from "./authModal";

function Header({ onFilterChange, onSearch }) {
  const [tokenValidity, setTokenValidity] = useState(null);

  const checkTokenValidity = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTokenValidity(true);
      } catch (error) {
        setTokenValidity(false);
      }
    } else {
      setTokenValidity(false);
    }
  };

  useEffect(() => {
    checkTokenValidity();
  }, []);

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
              {tokenValidity === false && (
                <AuthModal onLoginSuccess={checkTokenValidity} />
              )}
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;

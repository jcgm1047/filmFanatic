// Footer.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "./footer.css"; // Asegúrate de crear y enlazar un archivo de estilos para el footer

function Footer() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <h5>Secciones Populares</h5>
            <ul>
              <li>
                <button onClick={() => alert("Navegar a Inicio")}>
                  Inicio
                </button>
              </li>
              <li>
                <button
                  onClick={() => alert("Navegar a Críticas de Películas")}
                >
                  Críticas de Películas
                </button>
              </li>
              <li>
                <button onClick={() => alert("Navegar a Próximos Estrenos")}>
                  Próximos Estrenos
                </button>
              </li>
              <li>
                <button onClick={() => alert("Navegar a Top 10")}>
                  Top 10
                </button>
              </li>
            </ul>
          </div>
          <div className="col">
            <h5>Información de Contacto</h5>
            <p>Correo: contacto@criticaspeliculas.com</p>
            <p>Teléfono: 000-000-000</p>
          </div>
          <div className="col">
            <h5>Síguenos</h5>
            <ul className="social-links">
              <li>
                <button onClick={() => alert("Navegar a Facebook")}>
                  Facebook
                </button>
              </li>
              <li>
                <button onClick={() => alert("Navegar a Twitter")}>
                  Twitter
                </button>
              </li>
              <li>
                <button onClick={() => alert("Navegar a Instagram")}>
                  Instagram
                </button>
              </li>
              <li>
                <button onClick={() => alert("Navegar a YouTube")}>
                  YouTube
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <Button variant="primary" onClick={handleShow}>
              Contacto
            </Button>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <p>
              &copy; {new Date().getFullYear()} Críticas de Películas. Todos los
              derechos reservados.
            </p>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contáctanos</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formName">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" placeholder="Ingresa tu nombre" />
            </Form.Group>
            <Form.Group controlId="formEmail">
              <Form.Label>Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu correo electrónico"
              />
            </Form.Group>
            <Form.Group controlId="formPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control type="tel" placeholder="Ingresa tu teléfono" />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </footer>
  );
}

export default Footer;

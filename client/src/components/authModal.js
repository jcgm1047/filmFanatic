import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthModal = () => {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Para alternar entre registro e inicio de sesión
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Estado para el mensaje de notificación
  const navigate = useNavigate();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { email, password }
      : { username, email, password };

    try {
      const response = await axios.post(
        `http://localhost:3000${endpoint}`,
        payload
      );
      localStorage.setItem("token", response.data.token);
      setMessage(
        isLogin
          ? "Inicio de sesión exitoso. Redirigiendo..."
          : "Registro exitoso. Redirigiendo..."
      );
      setTimeout(() => {
        navigate("/profile");
        handleClose();
      }, 2000); // Redirigir después de 2 segundos
    } catch (error) {
      if (error.response && error.response.data) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage("Error: No se pudo conectar con el servidor.");
      }
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        {isLogin ? "Iniciar Sesión" : "Registrarse"}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {!isLogin && (
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Nombre de Usuario</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingresa tu nombre de usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingresa tu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              {isLogin ? "Iniciar Sesión" : "Registrarse"}
            </Button>
            <Button variant="link" onClick={toggleAuthMode}>
              {isLogin
                ? "¿No tienes cuenta? Regístrate aquí"
                : "¿Ya tienes cuenta? Inicia sesión aquí"}
            </Button>
          </Form>
          {message && <p className="mt-3">{message}</p>}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthModal;

import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthModal = ({ onSuccessfulLogin }) => {
  const [show, setShow] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Para alternar entre registro e inicio de sesión
  const [username, setUsername] = useState(""); // Añadir estado para el nombre de usuario
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
      : { username, email, password }; // Añadir nombre de usuario en el payload de registro

    try {
      // Realiza la solicitud de inicio de sesión o registro
      const response = await axios.post(
        `http://localhost:3000${endpoint}`,
        payload
      );

      // Almacenar el token y el rol en el localStorage
      if (response.data.token && response.data.role) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        console.log("Token y rol guardados en localStorage");

        // Notificar al header que el inicio de sesión o registro fue exitoso
        onSuccessfulLogin();

        // Cerrar el modal
        handleClose();

        // Redirigir según el rol del usuario
        if (response.data.role === "admin") {
          // Si el usuario tiene el rol de admin, redirige al dashboard
          navigate("/admin/dashboard");
        } else {
          // Si no, redirige al perfil
          navigate("/profile");
        }
      } else {
        setMessage("No se obtuvo un token válido.");
        console.error("Token no obtenido en la respuesta.");
      }
    } catch (error) {
      setMessage("Error al iniciar sesión o registrar");
      console.error("Error al iniciar sesión o registrar:", error);
    }
  };

  return (
    <>
      <Button variant="dark" onClick={handleShow}>
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

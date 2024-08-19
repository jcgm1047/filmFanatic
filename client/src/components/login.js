import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Estado para el mensaje de notificación
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login", // Cambia la URL para apuntar a localhost:3000
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      setMessage("Inicio de sesión exitoso. Redirigiendo...");
      setTimeout(() => navigate("/profile"), 2000); // Redirigir después de 2 segundos
    } catch (error) {
      // Manejo de errores mejorado
      if (error.response && error.response.data) {
        setMessage("Error al iniciar sesión: " + error.response.data.error);
      } else {
        setMessage(
          "Error al iniciar sesión: No se pudo conectar con el servidor."
        );
      }
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>} {/* Muestra el mensaje de notificación */}
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(""); // Estado para el mensaje de notificación
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        {
          username,
          email,
          password,
        }
      );
      localStorage.setItem("token", response.data.token);
      setMessage("Registro exitoso. Redirigiendo..."); // Mensaje de éxito
      setTimeout(() => navigate("/profile"), 2000); // Redirigir después de 2 segundos
    } catch (error) {
      // Verifica si existe error.response
      if (error.response && error.response.data) {
        setMessage("Error en el registro: " + error.response.data.error);
      } else {
        setMessage(
          "Error en el registro: No se pudo conectar con el servidor."
        );
      }
      console.error("Error en el registro:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>} {/* Muestra el mensaje de notificación */}
    </div>
  );
};

export default Register;

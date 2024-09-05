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
      // Realiza la solicitud de inicio de sesión
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        { email, password }
      );
      console.log(response);
      // Verificar si el token está presente en la respuesta
      if (response.data.token) {
        console.log("Token recibido:", response.data.token);
        // Almacenar el token en el localStorage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("role", response.data.role);

        // Obtener el perfil del usuario, que incluye el rol
        const userProfile = await axios.get(
          "http://localhost:3000/api/auth/me",
          {
            headers: {
              Authorization: `Bearer ${response.data.token}`,
            },
          }
        );
        console.log("datos: ", userProfile);
        // Verifica si el perfil del usuario se obtiene correctamente
        console.log("Perfil del usuario recibido:", userProfile.data);

        // Verifica si el rol fue recibido correctamente
        if (userProfile.data && userProfile.data.role) {
          console.log("Rol recibido del perfil:", userProfile.data.role);

          // Almacenar el rol en el localStorage
          localStorage.setItem("role", userProfile.data.role);

          console.log(
            "Rol guardado en localStorage:",
            localStorage.getItem("role")
          );

          // Redirigir según el rol del usuario
          if (userProfile.data.role === "admin") {
            setTimeout(() => navigate("/admin/dashboard"), 2000);
          } else {
            setTimeout(() => navigate("/profile"), 2000);
          }
        } else {
          console.error("No se encontró el rol del usuario");
          setMessage("Error al obtener el perfil del usuario");
        }
      } else {
        setMessage("No se obtuvo un token válido.");
        console.error("Token no obtenido en la respuesta.");
      }
    } catch (error) {
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default Login;

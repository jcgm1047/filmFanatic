import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, requiredRole }) => {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para cargar el rol

  useEffect(() => {
    // Intentar leer el rol del localStorage cuando el componente se monta
    const storedRole = localStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    }
    setLoading(false); // Una vez se intenta obtener el rol, marcamos la carga como completada
  }, []);

  // Verificar si aún estamos cargando
  if (loading) {
    return <p>Cargando...</p>; // Mostrar un mensaje mientras se carga
  }

  // Verificar si el token existe
  if (!localStorage.getItem("token")) {
    console.log("No hay token, redirigiendo al login...");
    return <Navigate to="/login" />;
  }

  // Verificar el rol del usuario y compararlo con el rol requerido
  if (requiredRole && role !== requiredRole) {
    console.log("Rol requerido:", requiredRole, "pero rol encontrado:", role);
    return <Navigate to="/profile" />;
  }

  // Si todo está bien, renderiza el componente hijo
  return children;
};

export default PrivateRoute;

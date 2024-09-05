import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      console.log("entre aca");
      const token = localStorage.getItem("token");

      if (!token) {
        // Si no hay token, redirigir al usuario a la página de login
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/api/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("No se pudo obtener la información del usuario.");
        setLoading(false);
        // Redirigir al login si hay un error de autorización
        if (error.response && error.response.status === 401) {
          navigate("/login");
        }
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Perfil del Usuario</h1>
      <p>Email: {userData.email}</p>
      {/* Aquí puedes mostrar más datos del usuario */}
    </div>
  );
};

export default Profile;

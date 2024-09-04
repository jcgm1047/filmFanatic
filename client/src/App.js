import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./components/movieList";
import Header from "./components/header";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/register";
import PrivateRoute from "./components/privateRoute";
import Footer from "./components/footer"; // Importa el Footer
import AdminLogin from "./components/adminLogin"; // El componente que vamos a crear
import AdminDashboard from "./components/adminDashboard"; // El componente del CRUD

function App() {
  const [filters, setFilters] = useState({ genre: "", year: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (newFilters) => {
    console.log("Filters updated:", newFilters); // Debugging
    setFilters(newFilters);
  };

  const handleSearch = (search) => {
    console.log("Search term updated:", search); // Debugging
    setSearchTerm(search);
  };

  return (
    <Router>
      <div className="App">
        <Header onFilterChange={handleFilterChange} onSearch={handleSearch} />
        <Routes>
          <Route
            path="/"
            element={<MovieList filters={filters} searchTerm={searchTerm} />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          {/* Nueva ruta para la administración */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

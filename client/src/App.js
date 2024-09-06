import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./components/movies/movieList";
import Header from "./components/header/header";
import Profile from "./components/user/profile";
import Register from "./components/auth/register";
import PrivateRoute from "./components/privateRoute";
import Footer from "./components/footer/footer";
import AdminDashboard from "./components/admin/adminDashboard";

function App() {
  const [filters, setFilters] = useState({ genre: "", year: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSearch = (search) => {
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
          <Route path="/register" element={<Register />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <PrivateRoute requiredRole="admin">
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

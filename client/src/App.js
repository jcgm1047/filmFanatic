import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./components/movieList";
import Header from "./components/header";
import Profile from "./components/profile";
import Register from "./components/register";
import PrivateRoute from "./components/privateRoute";
import Footer from "./components/footer";
import AdminDashboard from "./components/adminDashboard";

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

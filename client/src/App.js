import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MovieList from "./components/movieList";
import Login from "./components/login";
import Profile from "./components/profile";
import Register from "./components/register";
import PrivateRoute from "./components/privateRoute";

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Películas Populares</h1>
        <Routes>
          <Route path="/" element={<MovieList />} />
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      navigate("/admin/dashboard");
    } else {
      setError("Credenciales incorrectas. Intenta nuevamente.");
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: "#508bfc" }}>
      <Container className="py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card shadow-2-strong"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <h3 className="mb-5">Sign in</h3>
                <form onSubmit={handleLogin}>
                  <div className="form-outline mb-4">
                    <input
                      type="text"
                      id="typeEmailX-2"
                      className="form-control form-control-lg"
                      placeholder="Ingresa usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="form-label" htmlFor="typeEmailX-2">
                      Usuario
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="typePasswordX-2"
                      className="form-control form-control-lg"
                      placeholder="Ingresa contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="typePasswordX-2">
                      Contraseña
                    </label>
                  </div>

                  {error && <p style={{ color: "red" }}>{error}</p>}

                  <div className="form-check d-flex justify-content-start mb-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="form1Example3"
                    />
                    <label className="form-check-label" htmlFor="form1Example3">
                      Recordar contraseña
                    </label>
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    Ingresar
                  </button>

                  <hr className="my-4" />

                  <button
                    className="btn btn-lg btn-block btn-primary"
                    style={{ backgroundColor: "#dd4b39" }}
                    type="button"
                  >
                    <i className="fab fa-google me-2"></i> Iniciar con Google
                  </button>
                  <button
                    className="btn btn-lg btn-block btn-primary mb-2"
                    style={{ backgroundColor: "#3b5998" }}
                    type="button"
                  >
                    <i className="fab fa-facebook-f me-2"></i> Iniciar con
                    Facebook
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AdminLogin;

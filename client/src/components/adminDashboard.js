import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Form,
  Container,
  Modal,
  FloatingLabel,
} from "react-bootstrap";
import axios from "axios";

const AdminDashboard = () => {
  const [profiles, setProfiles] = useState([]); // Estado para almacenar los perfiles de usuario
  const [newProfile, setNewProfile] = useState({
    username: "",
    email: "",
    role: "User", // Valor predeterminado para el rol al crear un nuevo perfil
  }); // Estado para crear un nuevo perfil
  const [selectedProfile, setSelectedProfile] = useState(null); // Perfil seleccionado para actualizar
  const [showModal, setShowModal] = useState(false); // Estado para el modal de actualización
  const [showCreateModal, setShowCreateModal] = useState(false); // Estado para el modal de creación

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Función para obtener los perfiles de usuario del backend
  const fetchProfiles = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/profiles");
      setProfiles(response.data);
    } catch (error) {
      console.error("Error fetching profiles:", error);
    }
  };

  // Función para crear un nuevo perfil
  const handleCreateProfile = async () => {
    try {
      console.log("Datos enviados al servidor:", newProfile);

      const response = await axios.post(
        "http://localhost:3000/api/profiles",
        newProfile
      );
      setProfiles([...profiles, response.data]);
      setNewProfile({ username: "", email: "", role: "User", password: "" }); // Reiniciar el formulario
      setShowCreateModal(false);
    } catch (error) {
      console.error("Error al crear el perfil:", error);
      alert(
        "Hubo un error al crear el perfil. Verifica los datos e intenta nuevamente."
      );
    }
  };

  // Función para eliminar un perfil
  const handleDeleteProfile = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/profiles/${id}`);
      setProfiles(profiles.filter((profile) => profile._id !== id)); // Eliminar el perfil del estado
    } catch (error) {
      console.error("Error al eliminar el perfil:", error);
    }
  };

  // Mostrar el modal y cargar el perfil seleccionado para actualizar
  const handleShowUpdateModal = (profile) => {
    setSelectedProfile(profile);
    setShowModal(true);
  };

  // Cerrar el modal de actualización
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProfile(null); // Limpiar el perfil seleccionado
  };

  // Cerrar el modal de creación de perfil
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  // Función para actualizar un perfil
  const handleUpdateProfile = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/profiles/${selectedProfile._id}`,
        selectedProfile
      );
      setProfiles(
        profiles.map((profile) =>
          profile._id === selectedProfile._id ? response.data : profile
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Administrar Perfiles</h2>

      {/* Botón para abrir el modal de creación de nuevo perfil */}
      <Button
        variant="success"
        className="mb-3"
        style={{ marginRight: "1em" }} // Espacio de 1em entre el botón y la tabla
        onClick={() => setShowCreateModal(true)}
      >
        Crear Nuevo Perfil
      </Button>

      {/* Tabla de perfiles con acciones */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {profiles.map((profile, index) => (
            <tr key={profile._id}>
              <td>{index + 1}</td> {/* Índice de la fila */}
              <td>{profile.username}</td>
              <td>{profile.email}</td>
              <td>{profile.role}</td>
              <td>
                <Button
                  variant="warning"
                  onClick={() => handleShowUpdateModal(profile)}
                >
                  Actualizar
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProfile(profile._id)}
                  className="ms-2" // Espaciado entre los botones
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal para Actualizar Perfil */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Actualizar Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProfile && (
            <Form>
              <FloatingLabel
                controlId="floatingInput"
                label="Nombre de Usuario"
                className="mb-3"
              >
                <Form.Control
                  type="text"
                  value={selectedProfile.username}
                  onChange={(e) =>
                    setSelectedProfile({
                      ...selectedProfile,
                      username: e.target.value,
                    })
                  }
                />
              </FloatingLabel>

              <FloatingLabel
                controlId="floatingEmail"
                label="Correo Electrónico"
                className="mb-3"
              >
                <Form.Control
                  type="email"
                  value={selectedProfile.email}
                  onChange={(e) =>
                    setSelectedProfile({
                      ...selectedProfile,
                      email: e.target.value,
                    })
                  }
                />
              </FloatingLabel>

              {/* Selector de Rol */}
              <FloatingLabel
                controlId="floatingRole"
                label="Rol"
                className="mb-3"
              >
                <Form.Select
                  value={selectedProfile.role}
                  onChange={(e) =>
                    setSelectedProfile({
                      ...selectedProfile,
                      role: e.target.value,
                    })
                  }
                >
                  <option value="user">user</option>
                  <option value="admin">admin</option>
                </Form.Select>
              </FloatingLabel>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleUpdateProfile}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal para Crear Nuevo Perfil */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal}>
        <Modal.Header closeButton>
          <Modal.Title>Crear Nuevo Perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FloatingLabel
              controlId="floatingUsername"
              label="Nombre de Usuario"
              className="mb-3"
            >
              <Form.Control
                type="text"
                placeholder="Ingresa el nombre de usuario"
                value={newProfile.username}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, username: e.target.value })
                }
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingEmail"
              label="Correo Electrónico"
              className="mb-3"
            >
              <Form.Control
                type="email"
                placeholder="Ingresa el email"
                value={newProfile.email}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, email: e.target.value })
                }
              />
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingPassword"
              label="Contraseña"
              className="mb-3"
            >
              <Form.Control
                type="password"
                placeholder="Ingresa la contraseña"
                value={newProfile.password || ""} // Asegúrate de que password esté en el estado
                onChange={(e) =>
                  setNewProfile({ ...newProfile, password: e.target.value })
                }
              />
            </FloatingLabel>

            {/* Selector de Rol */}
            <FloatingLabel
              controlId="floatingRole"
              label="Rol"
              className="mb-3"
            >
              <Form.Select
                value={newProfile.role}
                onChange={(e) =>
                  setNewProfile({ ...newProfile, role: e.target.value })
                }
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </FloatingLabel>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCreateModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCreateProfile}>
            Crear Perfil
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminDashboard;

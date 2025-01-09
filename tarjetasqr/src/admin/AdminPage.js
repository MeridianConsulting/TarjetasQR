import React, { useState, useEffect } from 'react';
import '../assets/css/admin.css';

const AdminPage = ({ onLogout }) => {
  const [empleados, setEmpleados] = useState([]);
  const [editEmpleado, setEditEmpleado] = useState(null);
  const [newEmpleado, setNewEmpleado] = useState({
    nombre: '',
    cargo: '',
    numero_telefonico: '',
    email: '',
    compania: '',
    telefono_empresa: '',
    telefono_internacional: '',
  });
  const [searchTerm, setSearchTerm] = useState('');

  const apiUrl = process.env.REACT_APP_API_BASE_URL; // Variable de entorno para la URL base

  const fetchEmpleados = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/employees`);
      if (!response.ok) {
        throw new Error('Error al obtener empleados');
      }
      const data = await response.json();
      setEmpleados(data);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    }
  };

  useEffect(() => {
    fetchEmpleados();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmpleado({ ...newEmpleado, [name]: value });
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditEmpleado({ ...editEmpleado, [name]: value });
  };

  const handleCreateEmpleado = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEmpleado),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al crear empleado: ${errorText}`);
      }
      const data = await response.json();
      setEmpleados([...empleados, data]);
      setNewEmpleado({
        nombre: '',
        cargo: '',
        numero_telefonico: '',
        email: '',
        compania: '',
        telefono_empresa: '',
        telefono_internacional: '',
      });
      fetchEmpleados(); // Actualizar la lista de empleados
    } catch (error) {
      console.error('Error al crear empleado:', error);
    }
  };

  const handleDeleteEmpleado = async (id) => {
    try {
      const response = await fetch(`${apiUrl}/admin/employees/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al eliminar empleado: ${errorText}`);
      }
      setEmpleados(empleados.filter((empleado) => empleado.Id !== id));
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  const handleEditEmpleado = (empleado) => {
    setEditEmpleado(empleado);
  };

  const handleUpdateEmpleado = async () => {
    try {
      const response = await fetch(`${apiUrl}/admin/employees/${editEmpleado.Id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editEmpleado),
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error al actualizar empleado: ${errorText}`);
      }
      setEmpleados(
        empleados.map((empleado) =>
          empleado.Id === editEmpleado.Id ? editEmpleado : empleado
        )
      );
      setEditEmpleado(null);
    } catch (error) {
      console.error('Error al actualizar empleado:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditEmpleado(null);
  };

  const filteredEmpleados = empleados.filter(empleado => {
    const nombre = empleado.nombre?.toLowerCase() || '';
    const cargo = empleado.cargo?.toLowerCase() || '';
    const email = empleado.email?.toLowerCase() || '';
    return (
      nombre.includes(searchTerm.toLowerCase()) ||
      cargo.includes(searchTerm.toLowerCase()) ||
      email.includes(searchTerm.toLowerCase())
    );
  });
    return (
      <div className="admin-page">
        <h1 className="admin-page__title">Admin Dashboard</h1>
  
        {/* Barra de búsqueda */}
        <div className="admin-page__search">
          <input
            type="text"
            className="admin-page__search-input"
            placeholder="Buscar por nombre, cargo o email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
  
        <table className="admin-page__table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Cargo</th>
              <th>Número Telefónico</th>
              <th>Email</th>
              <th>Compañía</th>
              <th>Teléfono Empresa</th>
              <th>Teléfono Internacional</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmpleados.map((empleado, index) => (
              <tr key={empleado.Id || `empleado-${index}`}>
                <td>{empleado.Id}</td>
                <td>{empleado.nombre}</td>
                <td>{empleado.cargo}</td>
                <td>{empleado.numero_telefonico}</td>
                <td>{empleado.email}</td>
                <td>{empleado.compania}</td>
                <td>{empleado.telefono_empresa}</td>
                <td>{empleado.telefono_internacional}</td>
                <td>
                  <button
                    className="admin-page__button admin-page__button--edit"
                    onClick={() => handleEditEmpleado(empleado)}
                  >
                    Editar
                  </button>
                  <button
                    className="admin-page__button admin-page__button--delete"
                    onClick={() => handleDeleteEmpleado(empleado.Id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
  
        {editEmpleado && (
          <div className="admin-page__modal">
            <h2>Editar Empleado</h2>
            <form className="admin-page__form">
              <input
                className="admin-page__input"
                type="text"
                name="nombre"
                placeholder="Nombre"
                value={editEmpleado.nombre}
                onChange={handleEditInputChange}
              />
              <input
                className="admin-page__input"
                type="text"
                name="cargo"
                placeholder="Cargo"
                value={editEmpleado.cargo}
                onChange={handleEditInputChange}
              />
              <input
                className="admin-page__input"
                type="text"
                name="numero_telefonico"
                placeholder="Número Telefónico"
                value={editEmpleado.numero_telefonico}
                onChange={handleEditInputChange}
              />
              <input
                className="admin-page__input"
                type="email"
                name="email"
                placeholder="Email"
                value={editEmpleado.email}
                onChange={handleEditInputChange}
              />
              <input
                className="admin-page__input"
                type="text"
                name="compania"
                placeholder="Compañía"
                value={editEmpleado.compania}
                onChange={handleEditInputChange}
              />
              <input
                className="admin-page__input"
                type="text"
                name="telefono_empresa"
                placeholder="Teléfono Empresa"
                value={editEmpleado.telefono_empresa}
                onChange={handleEditInputChange}
              />
              <input
                className="admin-page__input"
                type="text"
                name="telefono_internacional"
                placeholder="Teléfono Internacional"
                value={editEmpleado.telefono_internacional}
                onChange={handleEditInputChange}
              />
              <button
                className="admin-page__button admin-page__button--submit"
                type="button"
                onClick={handleUpdateEmpleado}
              >
                Guardar Cambios
              </button>
              <button
                className="admin-page__button admin-page__button--cancel"
                type="button"
                onClick={handleCancelEdit}
              >
                Cancelar
              </button>
            </form>
          </div>
        )}
        
        <h2 className="admin-page__subtitle">Añadir Nuevo Empleado</h2>
        <form className="admin-page__form" onSubmit={handleCreateEmpleado}>
          <input
            className="admin-page__input"
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={newEmpleado.nombre}
            onChange={handleInputChange}
            required
          />
          <input
            className="admin-page__input"
            type="text"
            name="cargo"
            placeholder="Cargo"
            value={newEmpleado.cargo}
            onChange={handleInputChange}
            required
          />
          <input
            className="admin-page__input"
            type="text"
            name="numero_telefonico"
            placeholder="Número Telefónico"
            value={newEmpleado.numero_telefonico}
            onChange={handleInputChange}
            required
          />
          <input
            className="admin-page__input"
            type="email"
            name="email"
            placeholder="Email"
            value={newEmpleado.email}
            onChange={handleInputChange}
            required
          />
          <input
            className="admin-page__input"
            type="text"
            name="compania"
            placeholder="Compañía"
            value={newEmpleado.compania}
            onChange={handleInputChange}
          />
          <input
            className="admin-page__input"
            type="text"
            name="telefono_empresa"
            placeholder="Teléfono Empresa"
            value={newEmpleado.telefono_empresa}
            onChange={handleInputChange}
          />
          <input
            className="admin-page__input"
            type="text"
            name="telefono_internacional"
            placeholder="Teléfono Internacional"
            value={newEmpleado.telefono_internacional}
            onChange={handleInputChange}
          />
          <button className="admin-page__button admin-page__button--submit" type="submit">
            Crear
          </button>
        </form>
        <button className="admin-page__button admin-page__button--logout" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    );
  };

export default AdminPage;

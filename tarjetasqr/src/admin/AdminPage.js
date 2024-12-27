import React, { useState, useEffect } from 'react';

const AdminPage = ({ onLogout }) => {
  const [empleados, setEmpleados] = useState([]);
  const [newEmpleado, setNewEmpleado] = useState({
    nombre: '',
    cargo: '',
    numero_telefonico: '',
    email: '',
    compania: '',
    telefono_empresa: '',
    telefono_internacional: ''
  });

  useEffect(() => {
    const fetchEmpleados = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/admin/employees'); // Ruta ajustada
        if (!response.ok) {
          throw new Error('Error al obtener empleados');
        }
        const data = await response.json();
        setEmpleados(data);
      } catch (error) {
        console.error('Error al obtener empleados:', error);
      }
    };
    fetchEmpleados();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEmpleado({ ...newEmpleado, [name]: value });
  };

  const handleCreateEmpleado = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/api/admin/employees', { // Ruta ajustada
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newEmpleado)
      });
      if (!response.ok) {
        throw new Error('Error al crear empleado');
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
        telefono_internacional: ''
      });
    } catch (error) {
      console.error('Error al crear empleado:', error);
    }
  };

  const handleDeleteEmpleado = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/employees/${id}`, { // Ruta ajustada
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Error al eliminar empleado');
      }
      setEmpleados(empleados.filter(empleado => empleado.Id !== id));
    } catch (error) {
      console.error('Error al eliminar empleado:', error);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <table>
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
          {empleados.map(empleado => (
            <tr key={empleado.Id}>
              <td>{empleado.Id}</td>
              <td>{empleado.nombre}</td>
              <td>{empleado.cargo}</td>
              <td>{empleado.numero_telefonico}</td>
              <td>{empleado.email}</td>
              <td>{empleado.compania}</td>
              <td>{empleado.telefono_empresa}</td>
              <td>{empleado.telefono_internacional}</td>
              <td>
                <button onClick={() => handleDeleteEmpleado(empleado.Id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Añadir Nuevo Empleado</h2>
      <form onSubmit={handleCreateEmpleado}>
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={newEmpleado.nombre}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="cargo"
          placeholder="Cargo"
          value={newEmpleado.cargo}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="numero_telefonico"
          placeholder="Número Telefónico"
          value={newEmpleado.numero_telefonico}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newEmpleado.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="compania"
          placeholder="Compañía"
          value={newEmpleado.compania}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="telefono_empresa"
          placeholder="Teléfono Empresa"
          value={newEmpleado.telefono_empresa}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="telefono_internacional"
          placeholder="Teléfono Internacional"
          value={newEmpleado.telefono_internacional}
          onChange={handleInputChange}
        />
        <button type="submit">Añadir Empleado</button>
      </form>

      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default AdminPage;

import React, { useState } from 'react';
import '../assets/css/styles.css'; 

const Form = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    cargo: '',
    numero_telefonico: '',
    email: '',
    compania: '',
    telefono_empresa: '',
    telefono_internacional: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/api/empleados', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Empleado agregado exitosamente');
        setFormData({
          nombre: '',
          cargo: '',
          numero_telefonico: '',
          email: '',
          compania: '',
          telefono_empresa: '',
          telefono_internacional: ''
        });
      } else {
        alert('Error al agregar empleado');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Error al agregar empleado');
    }
  };

  return (
    <div className="card-container">
      <header className="header">
        <img src="https://cdn-icons-png.flaticon.com/512/5324/5324000.png" alt="Profile" />
        <h2>Formulario de Empleado</h2>
        <p>Completa los campos para agregar un nuevo empleado</p>
      </header>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <div className="contact-item">
            <label>Nombre:</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </div>
          <div className="contact-item">
            <label>Cargo:</label>
            <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} />
          </div>
          <div className="contact-item">
            <label>Número Telefónico:</label>
            <input type="text" name="numero_telefonico" value={formData.numero_telefonico} onChange={handleChange} />
          </div>
          <div className="contact-item">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
          </div>
          <div className="contact-item">
            <label>Compañia:</label>
            <input type="text" name="compania" value={formData.compania} onChange={handleChange} />
          </div>
          <div className="contact-item">
            <label>Teléfono Empresa:</label>
            <input type="number" name="telefono_empresa" value={formData.telefono_empresa} onChange={handleChange} />
          </div>
          <div className="contact-item">
            <label>Teléfono Internacional:</label>
            <input type="number" name="telefono_internacional" value={formData.telefono_internacional} onChange={handleChange} />
          </div>
          <div className="download-btn">
            <button type="submit">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;

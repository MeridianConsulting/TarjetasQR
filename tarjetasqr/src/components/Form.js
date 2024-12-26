import React, { useState } from 'react';
import '../assets/css/form.css'; 

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
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errors = {};
    if (!formData.nombre) errors.nombre = "El nombre es requerido";
    if (!formData.cargo) errors.cargo = "El cargo es requerido";
    if (!formData.numero_telefonico) errors.numero_telefonico = "El número telefónico es requerido";
    if (!formData.email) {
      errors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El email no es válido";
    }
    if (!formData.compania) errors.compania = "La compañía es requerida";
    if (!formData.telefono_empresa) errors.telefono_empresa = "El teléfono de la empresa es requerido";
    if (!formData.telefono_internacional) errors.telefono_internacional = "El teléfono internacional es requerido";
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

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
        setErrors({});
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
            {errors.nombre && <p className="error">{errors.nombre}</p>}
          </div>
          <div className="contact-item">
            <label>Cargo:</label>
            <input type="text" name="cargo" value={formData.cargo} onChange={handleChange} />
            {errors.cargo && <p className="error">{errors.cargo}</p>}
          </div>
          <div className="contact-item">
            <label>Número Telefónico:</label>
            <input type="text" name="numero_telefonico" value={formData.numero_telefonico} onChange={handleChange} />
            {errors.numero_telefonico && <p className="error">{errors.numero_telefonico}</p>}
          </div>
          <div className="contact-item">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div className="contact-item">
            <label>Compañia:</label>
            <input type="text" name="compania" value={formData.compania} onChange={handleChange} />
            {errors.compania && <p className="error">{errors.compania}</p>}
          </div>
          <div className="contact-item">
            <label>Teléfono Empresa:</label>
            <input type="number" name="telefono_empresa" value={formData.telefono_empresa} onChange={handleChange} />
            {errors.telefono_empresa && <p className="error">{errors.telefono_empresa}</p>}
          </div>
          <div className="contact-item">
            <label>Teléfono Internacional:</label>
            <input type="number" name="telefono_internacional" value={formData.telefono_internacional} onChange={handleChange} />
            {errors.telefono_internacional && <p className="error">{errors.telefono_internacional}</p>}
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

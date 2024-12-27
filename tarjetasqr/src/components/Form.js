import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Cambiado de useHistory a useNavigate
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
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Cambiado de useHistory a useNavigate

  // Validaciones del formulario
  const validate = () => {
    let errors = {};
    if (!formData.nombre.trim()) errors.nombre = "El nombre es requerido";
    if (!formData.cargo.trim()) errors.cargo = "El cargo es requerido";
    if (!formData.numero_telefonico.trim()) {
      errors.numero_telefonico = "El número telefónico es requerido";
    } else if (!/^\d+$/.test(formData.numero_telefonico)) {
      errors.numero_telefonico = "El número telefónico debe contener solo números";
    }
    if (!formData.email.trim()) {
      errors.email = "El email es requerido";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "El email no es válido";
    }
    if (!formData.compania.trim()) errors.compania = "La compañía es requerida";
    if (!formData.telefono_empresa.trim()) {
      errors.telefono_empresa = "El teléfono de la empresa es requerido";
    } else if (!/^\d+$/.test(formData.telefono_empresa)) {
      errors.telefono_empresa = "El teléfono de la empresa debe contener solo números";
    }
    if (!formData.telefono_internacional.trim()) {
      errors.telefono_internacional = "El teléfono internacional es requerido";
    } else if (!/^\d+$/.test(formData.telefono_internacional)) {
      errors.telefono_internacional = "El teléfono internacional debe contener solo números";
    }
    return errors;
  };

  // Manejo del cambio de inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Manejo del envío del formulario
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
        const newEmployee = await response.json();
        setSuccessMessage('Empleado agregado exitosamente');
        setErrorMessage('');
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
        setTimeout(() => navigate(`/empleados/${newEmployee.id}`), 1500); // Navega tras 1.5s
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.error || 'Error al agregar empleado');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('Ocurrió un error al conectar con el servidor');
      setSuccessMessage('');
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
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
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
            <input type="text" name="telefono_empresa" value={formData.telefono_empresa} onChange={handleChange} />
            {errors.telefono_empresa && <p className="error">{errors.telefono_empresa}</p>}
          </div>
          <div className="contact-item">
            <label>Teléfono Internacional:</label>
            <input type="text" name="telefono_internacional" value={formData.telefono_internacional} onChange={handleChange} />
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

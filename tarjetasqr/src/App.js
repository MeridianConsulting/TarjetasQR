import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import Form from '../src/components/Form'; // Importa el formulario
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta raíz para el formulario */}
          <Route path="/" element={<Form />} />
          {/* Ruta dinámica para el perfil, incluye el parámetro :id */}
          <Route path="/ProfilePage/:id" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

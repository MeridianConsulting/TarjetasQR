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
          <Route path="/" element={<ProfilePage />} />
          <Route path="/form" element={<Form />} /> {/* Nueva ruta para el formulario */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Login';
import UserLogin from './components/UserLogin';
import AdminPage from './admin/AdminPage';
import { encodeId } from './utils/encodeId';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProtectedRoute = ({ element, authenticated }) => {
  return authenticated ? element : <Navigate to="/admin/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);

  // Verificar autenticación al cargar
  useEffect(() => {
    const userToken = localStorage.getItem('userToken');
    if (userToken) {
      setIsUserAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = (success) => {
    setIsAuthenticated(success);
  };

  const handleUserLogin = (success) => {
    setIsUserAuthenticated(success);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('userToken');
    localStorage.removeItem('userCedula');
    setIsUserAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Ruta de login para administradores */}
          <Route 
            path="/admin/login" 
            element={<Login onLogin={handleAdminLogin} />} 
          />
          {/* Ruta de login para usuarios */}
          <Route 
            path="/user/login" 
            element={<UserLogin onLogin={handleUserLogin} />} 
          />
          {/* Ruta pública de perfil de usuario - accesible con URL exacta */}
          <Route 
            path="/ProfilePage/:id" 
            element={<ProfilePage />} 
          />
          {/* Ruta protegida de administración */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                element={<AdminPage onLogout={handleLogout} />}
                authenticated={isAuthenticated}
              />
            }
          />
          {/* Ruta raíz - redirige al login de usuarios */}
          <Route
            path="/"
            element={<Navigate to="/user/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
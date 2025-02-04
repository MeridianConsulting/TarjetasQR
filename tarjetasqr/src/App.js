import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProfilePage from './pages/ProfilePage';
import Login from './components/Login';
import AdminPage from './admin/AdminPage';
import '@fortawesome/fontawesome-free/css/all.min.css';

const ProtectedRoute = ({ element, authenticated }) => {
  return authenticated ? element : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (success) => {
    setIsAuthenticated(success);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={<Login onLogin={handleLogin} />} 
          />
          <Route path="/ProfilePage/:id" element={<ProfilePage />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                element={<AdminPage onLogout={handleLogout} />}
                authenticated={isAuthenticated}
              />
            }
          />
          <Route
            path="/"
            element={<Navigate to="/ProfilePage/79613401" />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
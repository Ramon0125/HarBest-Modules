import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Components/AuthContext';
import { ProtectedRoute } from './Components/ProtectedRoutes';
import Login from './Pages/Login/login';
import HomePortal from './Pages/HomePortal/HomePortal';

function App() {
  return (
    <AuthProvider>
      <Router>
        
        <Routes>
          <Route path="/" element={ <Login /> } />
          <Route path="/HomePortal" element={ <ProtectedRoute> <HomePortal /> </ProtectedRoute> } />
        </Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;

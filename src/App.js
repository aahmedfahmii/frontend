import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginView from './components/Login/Login';
import RegisterView from './components/Register/RegisterPage';
import HomeView from './components/HomeView'; // صفحة رئيسية

const isAuthenticated = () => !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />

        <Route
          path="/*"
          element={
            isAuthenticated() ? (
              <Routes>
                <Route path="/" element={<HomeView />} />
              </Routes>
            ) : (
              <Navigate to="/login" />
            )  
        }
        />
      </Routes>
    </Router>
  );
}

export default App;

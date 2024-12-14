import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginView from './components/Login/Login';
import RegisterView from './components/Register/RegisterPage';
import HomePage from './components/Home/HomePage';

const getAuthTokenFromCookies = () => {
  const cookies = document.cookie.split('; ');
  const authTokenCookie = cookies.find((cookie) => cookie.startsWith('authToken='));
  return authTokenCookie ? authTokenCookie.split('=')[1] : null;
};

const isAuthenticated = () => !!getAuthTokenFromCookies();

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
                <Route path="/home" element={<HomePage />} />
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


import React from 'react';

const Home = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div>
      <h1>Welcome to Football Fields Booking</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;

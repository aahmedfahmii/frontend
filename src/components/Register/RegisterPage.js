import React, { useEffect, useState } from 'react';
import './RegisterPage.css'; 
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    height: '',
    speed: 0,
    dribbling: 0,
    passing: 0,
    shooting: 0,
    picture: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 useEffect(() => {
         document.body.classList.add("custom-body");
    
         return () => {
          document.body.classList.remove("custom-body");
        };
      }, []);
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

     const payload = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      age: parseInt(formData.age),  
      height: parseFloat(formData.height), 
      speed: parseInt(formData.speed),
      dribbling: parseInt(formData.dribbling),
      passing: parseInt(formData.passing),
      shooting: parseInt(formData.shooting),
      picture: formData.picture,  
    };
    
    try {
      const response = await fetch('http://localhost:5001/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to register. Please check your data.');
      }

      if( response.status==200)
      {
        setMessage('Registration successful!');
        navigate('/login');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
    <div className="card">
      <h1>Register</h1>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleRegister} encType="multipart/form-data">
        <div className="input-group">
          <div>
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Name" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="Email" 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        <div className="input-group">
          <div>
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor="age">Age</label>
            <input 
              type="number" 
              id="age" 
              name="age" 
              placeholder="Age" 
              onChange={handleChange} 
              required 
            />
          </div>
        </div>
        <div className="input-group">
          <div>
            <label htmlFor="height">Height</label>
            <input 
              type="number" 
              id="height" 
              name="height" 
              placeholder="Height" 
              onChange={handleChange} 
              required 
            />
          </div>
          <div>
            <label htmlFor="speed">Speed</label>
            <input 
              type="number" 
              id="speed" 
              name="speed" 
              placeholder="Speed" 
              onChange={handleChange} 
            />
          </div>
        </div>
        <div className="input-group">
          <div>
            <label htmlFor="dribbling">Dribbling</label>
            <input 
              type="number" 
              id="dribbling" 
              name="dribbling" 
              placeholder="Dribbling" 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label htmlFor="passing">Passing</label>
            <input 
              type="number" 
              id="passing" 
              name="passing" 
              placeholder="Passing" 
              onChange={handleChange} 
            />
          </div>
        </div>
        <div className="input-group">
          <div>
            <label htmlFor="shooting">Shooting</label>
            <input 
              type="number" 
              id="shooting" 
              name="shooting" 
              placeholder="Shooting" 
              onChange={handleChange} 
            />
          </div>
          <div>
            <label htmlFor="picture">Profile Picture</label>
            <input 
              type="text" 
              id="picture" 
              name="picture" 
              onChange={handleChange} 
                          />
          </div>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;

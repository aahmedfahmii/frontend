import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
         document.body.classList.add("custom-body");
    
         return () => {
          document.body.classList.remove("custom-body");
        };
      }, []);
    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:5001/user/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({"email": email, "password":password }),
             });
if(response.ok){
    const data = await response.json();
    localStorage.setItem("token",data?.token)
    navigate('/home');  
}
           else {
                if (response.status === 401) {
                    setError('Invalid email or password');
                } else {
                    setError('An error occurred. Please try again later.');
                }
                return;
            } 
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please check your connection.');
        }
    };

    return (
        <div>
        <div className="login-card">
            <h1>Login</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <div>
                    <h3>
                        Don't have an account?  <a href='/register'>Register</a>
                    </h3>
                </div>
            </form>
        </div>
        </div>
    );
};

export default Login;

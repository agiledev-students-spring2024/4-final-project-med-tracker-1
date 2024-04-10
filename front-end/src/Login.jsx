import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import logo from './icons/favicon.png';
import './Login.css';

const Login = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loginError, setLoginError] = useState('');

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            email: document.getElementById('username').value,
            password: document.getElementById('password').value,
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            try {
                const data = await response.json();
                setIsLoggedIn(true);
            } catch (error) {
                throw new Error("Received non-JSON response from server.");
            }

        } catch (error) {
            console.error('Error logging in:', error);
            setLoginError(error.message || 'Login failed. Please check your credentials.');
        }
    };

    if (isLoggedIn) {
        return <Navigate to="/home" replace />;
    }

    return (
        <div className="full-white-bg login-page">
            <img className="app-logo" src={logo} alt="app logo"/>
            <h1 className="app-title">Med Tracker</h1>
            <form className="input-form login-form" onSubmit={handleLoginSubmit}>
                <input className="input-box" type="text" id="username" placeholder="Email" />
                <input className="input-box" type="password" id="password" placeholder="Password" />
                <button type="submit" className="blue-btn">Log in</button>
                {loginError && <div className="error-message">{loginError}</div>}
            </form>
            <div className="register-container">
                <p>Don't have an account?</p>
                <Link to="/register" className="sign-up-btn">Sign up</Link>
            </div>
        </div>
    );
};

export default Login;

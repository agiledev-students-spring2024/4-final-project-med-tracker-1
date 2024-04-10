import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import logo from './icons/favicon.png';
import './Login.css';

const Register = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const firstname = document.getElementById('firstName').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        try {
           const response = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/register`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password, firstname }),
});

            const data = await response.json();
            if (response.ok) {
                navigate('/login');
            } else {
                setError(data.message || "An error occurred during registration.");
            }
        } catch (error) {
            setError("Failed to connect to the server.");
        }
    };

    return (
        <div className="full-white-bg register-page">
            <img className="app-logo" src={logo} alt="app logo"/>
            <h2>Sign up for</h2>
            <h1 className="app-title">Med Tracker</h1>
            <form className="input-form register-form" onSubmit={handleSubmit}>
                <input type="firstName" id="firstName" placeholder="First Name" required />
                <input type="email" id="username" placeholder="Email" required />
                <input type="password" id="password" placeholder="Password" required />
                <input type="password" id="confirm-password" placeholder="Confirm Password" required />
                <button type="submit" className="blue-btn">Sign up</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            <div className="register-container">
                <p>Already have an account?</p>
                <Link to="/login" className="sign-up-btn">Log in</Link>
            </div>
        </div>
    );
};

export default Register;

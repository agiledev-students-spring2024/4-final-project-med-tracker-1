import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from './icons/favicon.png'
import './Login.css';

function changePassword(email, newPassword) {
    return fetch('/api/reset-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim().toLowerCase(), newPassword }),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok.');
    })
    .catch(error => {
        return error.json().then((data) => {
            throw new Error(data.message);
        });
    });
}


export const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password === passwordConfirm) {
            changePassword(email, password)
                .then((result) => {
                    navigate('/login');
                })
                .catch((error) => {
                    setError(error.message || 'Failed to change password. Please try again.');
                });
        } else {
            setError('Passwords do not match. Please try again.')
        }
    }

    return (
        <div className="full-white-bg reset-password-page register-page">
            <img className="app-logo" src={logo} alt="app logo"/>
            <h2>Change password for</h2>
            <h1 className="app-title">Med Tracker</h1>
            <form className="input-form register-form">
            <input  
                    type="email"
                    id="email"
                    value={email}
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value)}
                ></input>
                <input 
                    type="password" 
                    id="password"
                    value={password} 
                    placeholder="Password" 
                    onChange={e => setPassword(e.target.value)}
                />
                <input 
                    type="password" 
                    id="confirm-password" 
                    value={passwordConfirm} 
                    placeholder="Confirm Password"
                    onChange={e => setPasswordConfirm(e.target.value)}
                />


                <button type="submit" onClick={event => handleSubmit(event)} className="blue-btn">Save</button>
            </form>
            {error && <p className="error-message">{error}</p>}
        </div>
    )
}

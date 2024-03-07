import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css'

const Register = () => {
    return (
        <div className="login-page">
            <h1 className="page-name">Register</h1>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="email" id="username" placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Confirms password</label>
                    <input type="password" id="password" placeholder="Password" />
                </div>
            </form>
            <Link to="/home" className="clickable-button">Save</Link>
            <Link to="/" className="clickable-button">Back</Link>
        </div>
    )
}

export default Register
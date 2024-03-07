import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const ForgetPassword = () => {
    return (
        <div className="login-page">
            <h1 className="page-name">Forget Password</h1>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" id="username" aria-describedby="usernameHelp" placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" />
                </div>
            </form>           
            <Link to="/home" className="clickable-button">Save</Link>
            <Link to="/" className="clickable-button">Back</Link>
        </div>
    );
}

export default ForgetPassword;

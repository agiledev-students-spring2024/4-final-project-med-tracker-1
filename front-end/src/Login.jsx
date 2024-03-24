import React from 'react';
import { Link } from 'react-router-dom';
import logo from './icons/favicon.png'
import './Login.css';

const Login = () => {
    return (
        <div className="full-white-bg login-page">
            <img className="app-logo" src={logo} alt="app logo"/>
            <h1 className="app-title">Med Tracker</h1>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input className="input-box" type="username" id="username" aria-describedby="usernameHelp" placeholder="Enter username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input className="input-box" type="password" id="password" placeholder="Password" />
                </div>       
            </form>
            <Link to="/home" className="clickable-button">Log in</Link>
            <br></br><br></br>
            <Link to="/forgetpassword" className="clickable-button">Forget Password</Link>
            <Link to="/register" className="clickable-button">Register</Link>      
        </div>
    );
}

export default Login;

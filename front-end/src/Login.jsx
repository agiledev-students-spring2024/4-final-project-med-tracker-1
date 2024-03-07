import React from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
    return (
        <div className="login-page">
            <h1 className="page-name">Login</h1>
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
            <Link to="/home" className="clickable-button">Log in</Link>
            <br></br><br></br>
            <Link to="/forgetpassword" className="clickable-button">Forget Password</Link>
            <Link to="/register" className="clickable-button">Register</Link>      
        </div>
    );
}

export default Login;

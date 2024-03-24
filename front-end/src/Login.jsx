import React from 'react';
import { Link } from 'react-router-dom';
import logo from './icons/favicon.png'
import './Login.css';

const Login = () => {
    return (
        <div className="full-white-bg login-page">
            <img className="app-logo" src={logo} alt="app logo"/>
            <h1 className="app-title">Med Tracker</h1>
            <form className="input-form login-form">
                <input className="input-box" type="username" id="username" aria-describedby="usernameHelp" placeholder="Username" />
                <input className="input-box" type="password" id="password" placeholder="Password" />
                <Link to="/forgetpassword" className="forget-btn">Forget Password?</Link>
                <Link to="/home" className="blue-btn">Log in</Link>
            </form>
            <div className="register-container">
                <p>Don't have an account?</p>
                <Link to="/register" className="sign-up-btn">Sign up</Link> 
            </div> 
        </div>
    );
}

export default Login;

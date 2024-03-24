import React from 'react';
import { Link } from 'react-router-dom';
import logo from './icons/favicon.png'
import './Login.css'

const Register = () => {
    return (
        <div className="full-white-bg register-page">
            <img className="app-logo" src={logo} alt="app logo"/>
            <h2>Sign up for</h2>
            <h1 className="app-title">Med Tracker</h1>
            <form className="input-form register-form">
                <input type="firstname" id="firstname" placeholder="Preferred First Name" />
                <input type="email" id="username" placeholder="Email" />
                <input type="password" id="password" placeholder="Password" />
                <input type="password" id="confirm-password" placeholder="Confirm Password" />
                <Link to="/" className="blue-btn">Sign up</Link>
            </form>
            <div className="register-container">
                <p>Already have an account?</p>
                <Link to="/" className="sign-up-btn">Log in</Link> 
            </div> 
        </div>
    )
}

export default Register
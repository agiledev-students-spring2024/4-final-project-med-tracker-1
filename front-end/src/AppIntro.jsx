import React from 'react';
import { Link } from 'react-router-dom'
import logo from './icons/favicon.png'
import "./AppIntro.css"

const AppIntro = () => {
    return (
        <div className="full-color-bg app-intro-pg">
            <img className="app-logo" src={logo} alt="app logo"/>
            <h1 className="app-title">Med Tracker</h1>
            <p className="app-description">Your Personalized Medicine Management App</p>
            <Link className="begin-btn" to="/">Begin &gt;</Link>
        </div>
    );
};

export default AppIntro;
import React from 'react';
import NavBar from './NavBar';
import "./Setting.css" 
import { Link } from 'react-router-dom';

const Setting = () => {
    return(
        <>
        <NavBar />
        <div className="login-page"> 
            <h1 className="page-name">Settings</h1>

            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="username" id="username" placeholder="Enter username" />
                </div>
            </form>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="emergencycontact">Emergency contact</label>
                    <input type="name" id="name" placeholder="Enter contact name" />
                    <input type="phone" id="phone" placeholder="Enter contact phone number" />
                </div>
            </form>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Enter password" />
                </div>
            </form>
            <form className="login-form">
                <div className="form-group">
                    <label htmlFor="password">Confirm password</label>
                    <input type="password" id="confirm-password" placeholder="Password" />
                </div>
            </form>

            <Link to="/home" className="clickable-button">Save</Link>
        </div>
        </>
    )
}

export default Setting;

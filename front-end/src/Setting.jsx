import React from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const Setting = () => {
    return(
        <>
        <NavBar />
        <div className="setting-page login-page"> 
            <div className="half-color-bg">
                <div className="page-header">
                    <h1 className="title">Setting</h1>
                    <p className="subtitle">Customize your settings below</p>
                </div>
            </div>
            <div className="body-container">
                <form className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input type="username" id="username" placeholder="Enter username" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="emergencycontact">Emergency contact</label>
                        <input type="name" id="name" placeholder="Enter contact name" />
                        <input type="phone" id="phone" placeholder="Enter contact phone number" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder="Enter password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm password</label>
                        <input type="password" id="confirm-password" placeholder="Password" />
                    </div>
                    <Link to="/home" className="clickable-button">Save</Link>
                </form>
                <NavBar />
            </div>
        </div>
        </>
    )
}

export default Setting;

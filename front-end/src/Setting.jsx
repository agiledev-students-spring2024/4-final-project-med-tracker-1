import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

const Setting = () => {
    const [settings, setSettings] = useState('');
    useEffect(() => {
        const fetchSettings = async() => {
            const updatedSettings = { 
                firstName: 'Katie', 
                username: 'ky7821@nyu.edu', 
                password: 'katie0918'
            };
            setSettings(updatedSettings)
        }
        fetchSettings();
    }, [])

    return(
        <div className="setting-page"> 
            <div className="half-color-bg">
                <div className="page-header">
                    <h1 className="title">Setting</h1>
                    <p className="subtitle">Customize your settings below</p>
                </div>
            </div>
            <div className="body-container">
                <form className="input-form settings-form">
                    <div className="form-group">
                        <label htmlFor="firstName">Preferred first name</label>
                        <input type="firstName" id="firstName" placeholder={settings.firstName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username (Email)</label>
                        <input type="username" id="username" placeholder={settings.username} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" placeholder={settings.password} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Confirm password</label>
                        <input type="password" id="confirm-password" placeholder="Password" />
                    </div>
                    <Link to="/home" className="save-btn blue-btn">Save</Link>
                </form>
                <NavBar />
            </div>
        </div>
    )
}

export default Setting;

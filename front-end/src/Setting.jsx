import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';
import './Setting.css'

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
                        <input type="username" id="username" defaultValue={settings.username} />
                    </div>
                    <Link to="/home" className="save-btn blue-btn">Save</Link>
                    <Link to="/forget-password" className="white-btn">Change password</Link>
                </form>
                <NavBar />
            </div>
        </div>
    )
}

export default Setting;

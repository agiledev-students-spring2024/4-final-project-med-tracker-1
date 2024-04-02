import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import { Link, useNavigate } from 'react-router-dom';
import './Setting.css';

const Setting = () => {
    const [settings, setSettings] = useState({
        firstName: '',
        username: '',
        password: '' // Considering removing password from here due to security reasons
    });
    const navigate = useNavigate(); // This hook is from 'react-router-dom' to programmatically navigate after successful update

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const serverURL = process.env.REACT_APP_SERVER_HOSTNAME;
                const response = await fetch(`${serverURL}/api/user-settings`);
                if (!response.ok) throw new Error('Failed to fetch');
                const data = await response.json();
                setSettings({
                    firstName: data.firstName || '',
                    username: data.username || '',
                    password: '' // Clearing password for security reasons
                });
            } catch (error) {
                console.error('Error fetching user settings:', error);
            }
        };
        fetchSettings();
    }, []);

    const handleSave = async (event) => {
        event.preventDefault(); // Prevent the form from causing a page reload
        try {
            const serverURL = process.env.REACT_APP_SERVER_HOSTNAME;
            const response = await fetch(`${serverURL}/api/update-settings`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName: settings.firstName }) // Sending only the first name as that's what's being updated
            });

            if (!response.ok) throw new Error('Failed to update settings');
            alert('Settings updated successfully');
            navigate('/home'); // Navigate to '/home' or any other route as needed
        } catch (error) {
            console.error('Error updating settings:', error);
            alert('Failed to update settings');
        }
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        setSettings((prevSettings) => ({ ...prevSettings, [id]: value }));
    };

    return (
        <div className="setting-page">
            <div className="half-color-bg">
                <div className="page-header">
                    <h1 className="title">Setting</h1>
                    <p className="subtitle">Customize your settings below</p>
                </div>
            </div>
            <div className="body-container">
                <form className="input-form settings-form" onSubmit={handleSave}>
                    <div className="form-group">
                        <label htmlFor="firstName">Preferred first name</label>
                        <input type="text" id="firstName" value={settings.firstName} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="username">Username (Email)</label>
                        <input type="email" id="username" value={settings.username} readOnly />
                    </div>
                    <button type="submit" className="save-btn blue-btn">Save</button>
                    <Link to="/forget-password" className="white-btn">Change password</Link>
                </form>
                <NavBar />
            </div>
        </div>
    );
};

export default Setting;

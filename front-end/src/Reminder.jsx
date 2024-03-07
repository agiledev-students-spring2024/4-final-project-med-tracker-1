// Reminder.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Reminder.css';
import MedicationCard from './MedicationCard';

const Reminder = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/home'); // This will navigate to the home route
    };

    return (
        <div className="reminder-page">
            <header className="header">
                <h1>Reminder</h1>
            </header>
            <div className="card pill">
                <h2>Midol</h2>
                <div className="">26 pills left</div>
            </div>
            <div className="card dose">
                <h2>Dose</h2>
                <div>1 pill(s)</div>
            </div>
            <div className="card time">
                <h2>Time</h2>
                <div>08:00</div>
            </div>
            <div className="buttons">
                <button onClick={handleButtonClick} className="clickable-button">Confirm</button>
                <button onClick={handleButtonClick} className="clickable-button">Later</button>
                <button onClick={handleButtonClick} className="clickable-button">Skip</button>
            </div>
        </div >
    );
};

export default Reminder;

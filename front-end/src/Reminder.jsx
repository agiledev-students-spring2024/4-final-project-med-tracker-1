import React from 'react';
import './Reminder.css'; // Make sure to create a corresponding CSS file for styling

const Reminder = () => {
    return (
        <div className="reminder-container">
            <header className="reminder-header">
                <h1>Reminder</h1>
            </header>
            <div className="reminder-card">
                <h2>Midol</h2>
                <p>26 pills left</p>
            </div>
            <div className="reminder-card">
                <h2>Dose</h2>
                <p>1 pill(s)</p>
            </div>
            <div className="reminder-card">
                <h2>Time</h2>
                <p>08:00</p>
            </div>
            <div className="reminder-actions">
                <button className="reminder-button">Confirm</button>
                <button className="reminder-button">Later</button>
                <button className="reminder-button">Skip</button>
            </div>
        </div>
    );
};

export default Reminder;

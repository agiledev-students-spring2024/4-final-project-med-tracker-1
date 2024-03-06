import React from 'react';
import './Reminder.css'; // make sure to create a corresponding CSS file

const Reminder = () => {
    return (
        <div className="reminder-page">
            <header className="header">
                <h1>Reminder</h1>
            </header>
            <div className="card medication">
                <h2>Midol</h2>
                <div className="pill-count">26 pills left</div>
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
                <button className="btn confirm">Confirm</button>
                <button className="btn later">Later</button>
                <button className="btn skip">Skip</button>
            </div>
        </div>
    );
};

export default Reminder;

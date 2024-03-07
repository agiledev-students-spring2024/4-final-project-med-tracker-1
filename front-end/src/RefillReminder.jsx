import React from 'react';
import './RefillReminder.css'; // make sure to create a corresponding CSS file

const RefillReminder = () => {
    // Logic for handling reminders could be added here

    return (
        <div className="refill-reminder">
            <h1>Time to Refill</h1>
            <div className="medication-card">
                <h2>Zinc</h2>
                <div className="medication-details">
                    <button className="pill-count">10 pill(s) left</button>
                    <div className="medication-image"></div>
                </div>
            </div>
            <div className="refill-actions">
                <button className="refill-button confirm">Confirm</button>
                <button className="refill-button later">Later</button>
                <button className="refill-button skip">Skip</button>
            </div>
        </div>
    );
};

export default RefillReminder;

import React from 'react';
import './MedicationCard.css';

const MedicationCard = ({ name, pillsLeft, schedule }) => {
    return (
        <div className="medication-card">
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{pillsLeft} pill(s) left</p>
                <p>{schedule}</p>
            </div>
            <div className="medication-image">
                {/* Placeholder for medication image */}
            </div>
        </div>
    );
};

export default MedicationCard;

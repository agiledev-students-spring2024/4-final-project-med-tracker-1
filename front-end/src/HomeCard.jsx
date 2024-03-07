import React from 'react';
import './HomeCard.css';

const HomeCard = ({name, schedule,pillsLeft}) => {
    return (
        <div className="medication-card">
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{schedule}</p>
                <p>{pillsLeft} pill(s) left</p>
            </div>
            <div className="medication-image">
                {/* Placeholder for medication image */}
            </div>
        </div>
    );
};

export default HomeCard;
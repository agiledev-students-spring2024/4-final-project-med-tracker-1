import React from 'react';

const HistoryCard = ({ name, pillsLeft, schedule, date }) => {
    return (
        <div className="medication-card">
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{pillsLeft} pill(s) left</p>
                <p>{schedule}</p>
                <p>{date}</p>
            </div>
            <div className="medication-image">
                {/* Placeholder for medication image */}
            </div>
        </div>
    );
};

export default HistoryCard;
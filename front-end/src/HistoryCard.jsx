import React from 'react';

const HistoryCard = ({ name, photoURL, intakeAmt, unit, schedule}) => {
    return (
        <div className="medication-card">
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{intakeAmt} {unit}</p>
                <p>{schedule}</p>
            </div>
            {photoURL ? (
                <img className="medication-image" src={`${process.env.REACT_APP_SERVER_HOSTNAME}/med-images/${photoURL}`} alt="medication" />
            ) : (
                <div className="medication-image">{/* Placeholder */}</div>
            )}
        </div>
    );
};

export default HistoryCard;

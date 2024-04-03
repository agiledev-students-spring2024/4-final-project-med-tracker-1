import React from 'react';

const HomeCard = ({name, photoURL, schedule, dose}) => {
    return (
        <div className="medication-card">
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{schedule}</p>
                <p>{dose} pill(s)</p>
            </div>
            {photoURL ? (
                <img className="medication-image" src={`${process.env.REACT_APP_SERVER_HOSTNAME}/med-images/${photoURL}`} alt="med image"/>
            ) : (
                <div className="medication-image">{/* Placeholder */}</div>
            )}
        </div>
    );
};

export default HomeCard;
import React from 'react';

const HomeCard = ({name, schedule, dose}) => {
    return (
        <div className="medication-card">
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{schedule}</p>
                <p>{dose} pill(s)</p>
            </div>
            <div className="medication-image">
                {/* Placeholder for medication image */}
            </div>
        </div>
    );
};

export default HomeCard;
import React from 'react';


const HomeCard = ({ name, photoURL, schedule, dose }) => {
    name = name || 'Unknown Medicine';
    photoURL = photoURL || 'default_image.jpg'; 
    schedule = schedule || 'No schedule defined';
    dose = dose || '0';

    return (
        <div className="medication-card">
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{schedule}</p>
                <p>{dose}</p>
            </div>
            {photoURL ? (
                <img className="medication-image" src={`${process.env.REACT_APP_SERVER_HOSTNAME}/med-images/${photoURL}`} alt={`${name} medication`}/>
            ) : (
                <div className="medication-image">{/* Placeholder */}</div>
            )}
        </div>
    );
};
export default HomeCard;

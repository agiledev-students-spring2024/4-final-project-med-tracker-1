import React from 'react';

const HomeCard = ({ _id, name, photoURL, schedule, dose, unit, onClick }) => {
    return (
        <div className="medication-card" onClick={() => onClick(_id)}>
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{schedule}</p>
                <p>{dose} {unit}</p>
            </div>
            <img className="medication-image" src={photoURL ? `${process.env.REACT_APP_SERVER_HOSTNAME}/med-images/${photoURL}` : 'default_image.jpg'} alt={name} />
        </div>
    );
};

export default HomeCard;

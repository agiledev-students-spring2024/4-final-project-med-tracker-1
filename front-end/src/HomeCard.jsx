import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeCard = ({id, name, photoURL, schedule, dose, unit}) => {
    const navigate = useNavigate();
    const navReminder = (id) => {
        navigate(`/reminder/${id}`)
    }
    return (
        <div className="medication-card" onClick={() => navReminder(id)}>
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{schedule}</p>
                <p>{dose} {unit}</p>
            </div>
            <img 
                className="medication-image" 
                src={photoURL ? `${process.env.REACT_APP_SERVER_HOSTNAME}/med-images/${photoURL}` : 'default_image.jpg'} alt={name} 
            />
        </div>
    );
};

export default HomeCard;

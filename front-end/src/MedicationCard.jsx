import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MedicationCard.css';

const MedicationCard = ({ name, pillsLeft, schedule }) => {
    const navigate = useNavigate();
    const navToEdit = (event) => {
        event.preventDefault();
        navigate('/edit-medicine')
    }
    return (
        <div className="medication-card" onClick={navToEdit}>
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

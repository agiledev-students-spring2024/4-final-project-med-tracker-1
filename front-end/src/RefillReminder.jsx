import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RefillReminder.css'; // Assuming you have a separate CSS file for RefillReminder

const RefillCard = ({ name, photo, unit, totalAmt }) => {
    return (
        <div className="medication-card">
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{totalAmt} {unit} left</p>
            </div>
            <div className="medication-image" style={{ backgroundImage: `url(${photo})` }}>
                {/* Image is set as background */}
            </div>
        </div>
    );
};

const RefillReminder = () => {
    const [med, setMed] = useState({});
    useEffect(() => {
        const fetchMed = async () => {
            // This is a placeholder. You might need to fetch actual medication data from your backend or state management.
            const updatedMed = { medName: 'Zestril', photo: 'photoURL', unit: 'mg', totalAmt: 20 };
            setMed(updatedMed);
        };
        fetchMed();
    }, []);

    const navigate = useNavigate();

    const handleRefillAction = async (actionType) => {
        const serverURL = process.env.REACT_APP_SERVER_HOSTNAME; // Use environment variable for the server URL

        const response = await fetch(`${serverURL}/api/refill-${actionType}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                medName: med.medName,
                totalAmt: med.totalAmt,
            }),
        });

        if (response.ok) {
            navigate('/home');
        } else {
            console.error(`Failed to ${actionType} refill`);
        }
    };

    return (
        <div className="refill-reminder full-color-bg">
            <div className="pop-up-white-bg register-page">
                <h1 className="app-title">Time to Refill {med.medName}</h1>
                <div className="reminder-container medications-container">
                    <RefillCard
                        name={med.medName}
                        photo={med.photo}
                        unit={med.unit}
                        totalAmt={med.totalAmt}
                    />
                </div>
                <div className="reminder-btn-container medications-container">
                    <button onClick={() => handleRefillAction('confirm')} className="blue-btn">Confirm</button>
                    <button onClick={() => handleRefillAction('later')} className="white-btn">Later</button>
                    <button onClick={() => handleRefillAction('skip')} className="white-btn">Skip</button>
                </div>
            </div>
        </div>
    );
};

export default RefillReminder;

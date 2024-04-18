import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reminder.css';

const ReminderCard = ({ name, photo, unit, totalAmt, dose, time }) => {
    return (
        <>
            <div className="medication-card">
                <div className="medication-info">
                    <h1>{name}</h1>
                    <p>{totalAmt} {unit} left</p>
                </div>
                <div className="medication-image" style={{ backgroundImage: `url(${photo})` }}>
                    {/* Image is set as background */}
                </div>
            </div>
            <div className="reminder-info medication-card">
                <span className="field-name">Dose</span>
                <span className="entry">{dose} {unit}</span>
            </div>
            <div className="reminder-info medication-card">
                <span className="field-name">Time</span>
                <span className="entry">{time}</span>
            </div>
        </>
    );
};

const Reminder = () => {
    const [intake, setIntake] = useState('');
    const [med, setMed] = useState('');
    useEffect(() => {
        const fetchIntake = async () => {
            const updatedIntake = { medName: 'Zinc', dose: 1, time: '08:00' };
            setIntake(updatedIntake);
        }
        fetchIntake();
    }, []);

    useEffect(() => {
        const fetchMed = async () => {
            const updatedMed = { medName: 'Zinc', photo: 'photoURL', unit: 'pill(s)', totalAmt: 35 };
            setMed(updatedMed);
        }
        fetchMed();
    }, [intake]);

    const navigate = useNavigate();

    // Helper function to handle all intake actions
    const handleIntakeAction = async (actionType) => {
        const serverURL = process.env.REACT_APP_SERVER_HOSTNAME; // Use environment variable for the server URL
        //add a intakeid behind the slash
        const response = await fetch(`${serverURL}/api/${actionType}-intake`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                medName: intake.medName,
                action: actionType,
                dose: intake.dose,
                time: intake.time,
            }),
        });

        if (response.ok) {
            navigate('/home');
        } else {
            console.error(`Failed to ${actionType} intake`);
        }
    };

    return (
        <div className="reminder-page full-color-bg">
            <div className="pop-up-white-bg register-page">
                <h1 className="app-title">Take {intake.medName}</h1>
                <div className="reminder-container medications-container">
                    <ReminderCard
                        name={intake.medName}
                        photo={med.photo}
                        unit={med.unit}
                        totalAmt={med.totalAmt}
                        dose={intake.dose}
                        time={intake.time}
                    />
                </div>
                <div className="reminder-btn-container medications-container">
                    <button onClick={() => handleIntakeAction('confirm')} className="blue-btn">Confirm</button>
                    <button onClick={() => handleIntakeAction('later')} className="white-btn">Later</button>
                    <button onClick={() => handleIntakeAction('skip')} className="white-btn">Skip</button>
                </div>
            </div>
        </div >
    );
};

export default Reminder;

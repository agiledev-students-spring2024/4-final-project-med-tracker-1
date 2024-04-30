import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Reminder.css'

const ReminderCard = ({ name, photo, unit, totalAmt, dose, time }) => {
    return (
        <>
        <div className="medication-card">
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{totalAmt} {unit} left</p>
            </div>
            <img 
                className="medication-image" 
                src={photo ? `${process.env.REACT_APP_SERVER_HOSTNAME}/med-images/${photo}` : 'default_image.jpg'} alt={name} 
            />
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
    const { id } = useParams();
    const [intake, setIntake] = useState({});
    const [med, setMed] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedicationDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/reminder/${id}`, {
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
                });
                if (response.data) {
                    setMed(response.data.intakeObj.medicine);
                    setIntake(response.data.intakeObj.intake); // Make sure API provides intake data
                }
            } catch (error) {
                setError('Failed to fetch medication details: ' + error.message);
            }
        };

        fetchMedicationDetails();
    }, [id]);

    const handleIntakeAction = async (actionType) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/${actionType}-intake/${id}`, {action: actionType}, {
                headers: { 
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            if (response.status === 200) {
                console.log(response.data.historyList)
                navigate('/home');
            } else {
                throw new Error(response.data.error);
            }
        } catch (error) {
            setError(`Failed to ${actionType} intake: ` + error.message);
        }
    };

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <div className="reminder-page full-color-bg">
            <div className="pop-up-white-bg register-page">
                <h1 className="app-title">Take {med.medName}</h1>
                <div className="reminder-container medications-container">
                    {error && <p className="error-message">{error}</p>}
                    <ReminderCard
                        name={med.medName}
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
                    {error && <p className="error-message">{error}</p>}
                </div>
            </div>
        </div>
    );
};

export default Reminder;

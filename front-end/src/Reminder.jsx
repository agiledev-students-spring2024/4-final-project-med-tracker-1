import React, {useState, useEffect} from 'react';
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
                <div className="medication-image" url={photo}>
                    {/* Placeholder for medication image */}
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
        const fetchIntake = async() => {
            const updatedIntake = { medName: 'Zinc', dose: 1, time: '08:00' };
            setIntake(updatedIntake)
        }
        fetchIntake();
    }, [])
    useEffect(() => {
        const fetchMed = async() => {
            // use intake.medName to find information regarding the medication
            const updatedMed = { medName: 'Zinc', photo: 'photoURL', unit: 'pill(s)', totalAmt: 35}
            setMed(updatedMed);
        }
        fetchMed();
    }, [intake])
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/home'); // This will navigate to the home route
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
                    <button onClick={handleButtonClick} className="blue-btn">Confirm</button>
                    <button onClick={handleButtonClick} className="white-btn">Later</button>
                    <button onClick={handleButtonClick} className="white-btn">Skip</button>
                </div>    
            </div>
        </div >
    );
};

export default Reminder;

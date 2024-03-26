import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const RefillCard = ({ name, photo, unit, totalAmt}) => {
    // Logic for handling reminders could be added here
    return (
        <div className="medication-card">
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{totalAmt} {unit} left</p>
            </div>
            <div className="medication-image" url={photo}>
                {/* Placeholder for medication image */}
            </div>
        </div>
    );
};

const RefillReminder = () => {
    const [med, setMed] = useState('')
    useEffect(() => {
        const fetchMed = async() => {
            // use intake.medName to find information regarding the medication
            const updatedMed = { medName: 'Zinc', photo: 'photoURL', unit: 'pill(s)', totalAmt: 35}
            setMed(updatedMed);
        }
        fetchMed();
    }, [])
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/home'); // This will navigate to the home route
    };

    return (
        <div className="refill-reminder full-color-bg">
            <div className="pop-up-white-bg register-page">
                <h1 className="app-title">Time to Refil</h1>
                <div className="reminder-container medications-container">
                    <RefillCard 
                        name={med.medName}
                        photo={med.photo}
                        unit={med.unit}
                        totalAmt={med.totalAmt}
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

export default RefillReminder;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Reminder.css';
// Assuming MedicationCard is a component you'd like to use for rendering each medication card

const Reminder = () => {
    const navigate = useNavigate();
    const [medications, setMedications] = useState([]);

    useEffect(() => {
        // Fetch medication reminders
        fetch('http://localhost:3001/reminders')
            .then(response => response.json())
            .then(data => setMedications(data))
            .catch(error => console.error("Failed to fetch medications:", error));
    }, []);

    const handleAction = (medicationName, actionType) => {
        // Send action to the backend
        fetch('/reminder-action', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: medicationName, action: actionType }),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                // Optionally, refetch medications or update state based on response
            })
            .catch(error => console.error("Failed to perform action:", error));
    };

    return (
        <div className="reminder-page">
            <header className="header">
                <h1>Medication Reminder</h1>
            </header>
            {medications.map(medication => (
                <div key={medication.name} className="card">
                    <h2>{medication.name}</h2>
                    <div>{medication.pillsLeft} pills left</div>
                    <div>Dose: {medication.dose}</div>
                    <div>Time: {medication.schedule}</div>
                    <div className="buttons">
                        <button onClick={() => handleAction(medication.name, 'confirm')} className="clickable-button">Confirm</button>
                        <button onClick={() => handleAction(medication.name, 'later')} className="clickable-button">Later</button>
                        <button onClick={() => handleAction(medication.name, 'skip')} className="clickable-button">Skip</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Reminder;

import React, { useState, useEffect } from 'react';
import NavBar from './NavBar';
import HistoryCard from './HistoryCard';
import './Medicines.css';

function History() {
    const [medications, setMedications] = useState([]);
    const [error, setError] = useState(null); // State to handle errors

    useEffect(() => {
        const fetchMedications = async () => {
            const token = localStorage.getItem('token'); // Get token from local storage
            const response = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/history`, {
                headers: {
                    'Authorization': `Bearer ${token}`, // Include the JWT token in the request headers
                    'Content-Type': 'application/json'
                }
            });
            try {
                if (response.ok) {
                    const updatedMeds = await response.json();
                    setMedications(updatedMeds);
                } else {
                    throw new Error('Failed to fetch history: ' + response.statusText);
                }
            } catch (error) {
                setError(error.message); // Set error message in state
                setMedications([]); // Clear medications if there's an error
            }
        };
        fetchMedications();
    }, []);

    return (
        <>
            <div className="history-page">
                <div className="half-color-bg">
                    <div className="page-header">
                        <h1 className="title">History</h1>
                        <p className="subtitle">Your history of medicine intakes</p>
                    </div>
                </div>
                <div className="body-container">
                    {error ? (
                        <p className="error-message">{error}</p> // Display error message if there's an error
                    ) : (
                        <div className="medications-container">
                            {medications.map((historyEntry) => (
                                <HistoryCard
                                    key={`${historyEntry._id}`} // Assume each entry has a unique ID for key
                                    name={historyEntry.intakeMed.medicine.medName}
                                    photoURL={historyEntry.intakeMed.medicine.photo}
                                    intakeAmt={historyEntry.intakeMed.intake.dose}
                                    unit={historyEntry.intakeMed.medicine.unit}
                                    schedule={`${new Date(historyEntry.intakeTime).toLocaleDateString()}`}
                                />
                            ))}
                        </div>
                    )}
                    <NavBar />
                </div>
            </div>
        </>
    );
}

export default History;

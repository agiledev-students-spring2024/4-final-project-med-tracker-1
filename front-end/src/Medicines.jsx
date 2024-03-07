import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import MedicationCard from './MedicationCard';
import './Medicines.css';

const Medicines = () => {
    const [medications, setMedications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMedications = async () => {
            const updatedMeds = [
                { id: 1, name: 'Midol', pillsLeft: 26, schedule: 'Once daily' },
                { id: 2, name: 'Vitamin C', pillsLeft: 15, schedule: 'Take as Needed' },
                { id: 3, name: 'Zinc', pillsLeft: 10, schedule: 'Once daily' },
            ];
            setMedications(updatedMeds);
        };
        fetchMedications();
    }, []);

    const handleCardClick = (medicationId) => {
        navigate(`/edit-medicine/${medicationId}`); // Navigate to edit-medicine page with the medicine id
    };

    return (
        <div className="medications-page">
            <NavBar />
            <h1 className="page-name">Medicines</h1>
            <Link className="clickable-button" to="/edit-medicine">Add a medicine</Link>
            {medications.map((med) => (
                // Assuming MedicationCard is a presentation component, we wrap it with a Link for navigation
                <div key={med.id} onClick={() => handleCardClick(med.id)} className="medication-card-container">
                    <MedicationCard name={med.name} pillsLeft={med.pillsLeft} schedule={med.schedule} />
                </div>
            ))}
        </div>
    );
}

export default Medicines;

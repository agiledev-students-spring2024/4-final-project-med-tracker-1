import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import MedicationCard from './MedicationCard';
import './Medicines.css';

const Medicines = () => {
    const [medications, setMedications] = useState([]);
    useEffect(() => {
        const fetchMedications = async() => {
            const updatedMeds = [
                { name: 'Midol', pillsLeft: 26, schedule: 'Once daily' },
                { name: 'Vitamin C', pillsLeft: 15, schedule: 'Take as Needed' },
                { name: 'Zinc', pillsLeft: 10, schedule: 'Once daily' },
            ];
            setMedications(updatedMeds)
        }
        fetchMedications();
    }, [])
    
    return(
        <div className="medications-page">
            <div className="half-color-bg">
                <div className="page-header">
                    <h1 className="title">Medicines</h1>
                    <p className="subtitle">A list of all your medicines</p>
                </div>
            </div>
            <div className="body-container">
                <Link className="add-med-button white-btn" to="/add-medicine-1">Add new medicine</Link>
                <div className="medications-container">
                    {medications.map((med) => (
                        <MedicationCard 
                            key={med.name} 
                            name={med.name} 
                            pillsLeft={med.pillsLeft} 
                            schedule={med.schedule} 
                        />
                    ))}
                </div>
                <NavBar />  
            </div>            
            <h1 className="page-name">Medicines</h1>

        </div>
    )
}

export default Medicines
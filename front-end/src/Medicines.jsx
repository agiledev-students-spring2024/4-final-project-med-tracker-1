import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import MedicationCard from './MedicationCard';
import './Medicines.css';

const Medicines = () => {
    const [medications, setMedications] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchMedications = () => {
            axios
                .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/medicines`)
                .then(response => {
                    const updatedMedList = response.data.medList;
                    setMedications(updatedMedList)
                })
                .catch(err => {
                    const errMsg = JSON.stringify(err, null, 2) // convert error object to a string
                    setError(errMsg)
                })
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
                            key={med.medID} 
                            name={med.medName} 
                            pillsLeft={med.totalAmt}
                            unit={med.unit} 
                            frequency={med.frequency}
                            interval={med.interval} 
                        />
                    ))}
                    {error && <p className="error-message">{error}</p>} 
                </div>
                <NavBar />  
            </div>            
            <h1 className="page-name">Medicines</h1>
        </div>
    )
}

export default Medicines
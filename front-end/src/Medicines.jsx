import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
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
    
    const navigate = useNavigate();
    const navToEdit = (event) => {
        event.preventDefault();
        navigate('./edit-medicine')
    }
    return(
        <><div className="medications-page">
            <h1 className="page-name">Medicines</h1>
            <Link className="clickable-button" to="/add-medicine-1">Add a medicine</Link>
            {medications.map((med) => (
                <MedicationCard 
                    key={med.name} 
                    name={med.name} 
                    pillsLeft={med.pillsLeft} 
                    schedule={med.schedule} 
                    onClick={navToEdit}
                />
            ))}
            <NavBar />  
        </div></>
    )
}

export default Medicines
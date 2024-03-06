import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import MedicationCard from './MedicationCard'
import './Medicines.css'

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
        <><div className="medications-page">
            <h1 className="page-name">Medicines</h1>
            <button className="clickable-button">Add a medicine</button>
            {medications.map((med) => (
                <MedicationCard key={med.name} name={med.name} pillsLeft={med.pillsLeft} schedule={med.schedule} />
            ))}
            <NavBar />  
        </div></>
    )
}

export default Medicines
import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import HistoryCard from './HistoryCard'
import './Medicines.css'

function History() {
    const [medications, setMedications] = useState([]);
    useEffect(() => {
        const fetchMedications = async() => {
            const updatedMeds = [
                { name: 'Midol', pillsLeft: 26, schedule: '8:00AM', date:'Feb 12th' },
                { name: 'Vitamin C', pillsLeft: 15, schedule: '8:00AM', date:'Feb 12th' },
                { name: 'Zinc', pillsLeft: 10, schedule: '8:00AM', date:'Feb 12th'},
            ];
            setMedications(updatedMeds)
        }
        fetchMedications();
    }, [])


    return(
    <>
    <div className="medications-page">
        <NavBar />
        <h1 className="page-name">History</h1>
        {medications.map((med) => (
                <HistoryCard 
                    key={med.name} 
                    name={med.name} 
                    pillsLeft={med.pillsLeft} 
                    schedule={med.schedule} 
                    date={med.date}
                />
        ))}
    </div>
    </>
    )
}

export default History
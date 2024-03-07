import React, {useState, useEffect}  from 'react';
import NavBar from './NavBar';
import HomeCard from './HomeCard'
import './Medicines.css';

function Home() {
    const [medications, setMedications] = useState([]);
    useEffect(() => {
        const fetchMedications = async() => {
            const updatedMeds = [
                { name: 'Midol', schedule: '8:00AM', dose: 1 },
                { name: 'Vitamin C', schedule: '8:00AM', dose: 1},
                { name: 'Zinc',  schedule: '8:00AM', dose: 1},
            ];
            setMedications(updatedMeds)
        }
        fetchMedications();
    }, [])


    return(
        <div className="medications-page">
            <h1 className="page-name">Today</h1>
            {medications.map((med) => (
                    <HomeCard 
                        key={med.name} 
                        name={med.name} 
                        schedule={med.schedule} 
                        dose={med.dose} 
                    />
            ))}
            <NavBar />
        </div>
    )
}

export default Home
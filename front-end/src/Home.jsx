import React, {useState, useEffect}  from 'react';
import NavBar from './NavBar';
import HomeCard from './HomeCard'
import './Medicines.css';

function Home() {
    const [medications, setMedications] = useState([]);
    useEffect(() => {
        const fetchMedications = async() => {
            const updatedMeds = [
                { name: 'Midol', schedule: '8:00AM',pillsLeft: 26 },
                { name: 'Vitamin C', schedule: '8:00AM',pillsLeft: 15},
                { name: 'Zinc',  schedule: '8:00AM',pillsLeft: 10},
            ];
            setMedications(updatedMeds)
        }
        fetchMedications();
    }, [])


    return(
    <>
    <div className="medications-page">
    <NavBar />
        <h1 className="page-name">Today</h1>
        {medications.map((med) => (
                <HomeCard 
                    key={med.name} 
                    name={med.name} 
                    schedule={med.schedule} 
                    pillsLeft={med.pillsLeft} 
                />
        ))}
    </div>
    </>
    )
}

export default Home
import React, {useState, useEffect} from 'react';
import NavBar from './NavBar';
import HistoryCard from './HistoryCard'

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
    <div className="history-page">
        <div className="half-color-bg">
            <div className="page-header">
                <h1 className="title">History</h1>
                <p className="subtitle">Your history of medicine intakes</p>
            </div>
        </div>
        <div className="body-container">   
            <div className="medications-container">
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
            <NavBar />
        </div>   
    </div>
    </>
    )
}

export default History
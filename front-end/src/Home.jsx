import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import HomeCard from './HomeCard';
import logo from './icons/favicon.png'
import './Medicines.css';

function Home() {
    const [medications, setMedications] = useState([]);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchMedications = async () => {
            const response = await fetch('http://localhost:3001/home');
            const updatedMeds = await response.json();
            setMedications(updatedMeds);
        };
        fetchMedications();
    }, []);

    const handleReminderButtonClick = () => {
        navigate('/reminder');
    };

    return (
        <div className="home-page">
            <div className="half-color-bg">
                <img className="app-logo" src={logo} alt="app logo"/>
                <div className="page-header">
                    <h1 className="title">Hi, Katie!</h1>
                    <p className="subtitle">February 14, 2024</p>
                </div>
            </div>                
            <div className="body-container">
                {/* <button
                    className="reminder-button"
                    onClick={handleReminderButtonClick}
                    >
                        Reminder
                    </button> */}
                <h2>Today's Medicines</h2>
                <div className="medications-container">
                    {medications.map((med) => (
                        <HomeCard
                            key={med.name}
                            name={med.name}
                            schedule={med.schedule}
                            dose={med.dose} 
                        />
                    ))} 
                </div>                   
                <NavBar />
            </div>                
        </div>

    );
}

export default Home;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import HomeCard from './HomeCard';
import logo from './icons/favicon.png';
import './Medicines.css';

function Home() {
    const [medications, setMedications] = useState([]);
    const [userName, setUserName] = useState(''); // Add state to hold the user's name
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        // Fetch user settings to get the user's name
        const fetchUserSettings = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/user-settings`);
            if (response.ok) {
                const userSettings = await response.json();
                console.log("User settings fetched:", JSON.stringify(userSettings, null, 2)); // Detailed logging
                setUserName(userSettings.firstName); // Corrected line
                // Adjust this line based on the logged structure
            } else {
                console.error('Failed to fetch user settings');
            }
        };

        // Fetch medications
        const fetchMedications = async () => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/home`);
            if (response.ok) {
                const updatedMeds = await response.json();
                setMedications(updatedMeds);
            } else {
                console.error('Failed to fetch medications');
            }
        };

        fetchUserSettings(); // Call the function to fetch user settings
        fetchMedications(); // Call the function to fetch medications
    }, []);

    return (
        <div className="home-page">
            <div className="half-color-bg">
                <img className="app-logo" src={logo} alt="app logo" />
                <div className="page-header">
                    {/* Use the dynamically fetched user's name */}
                    <h1 className="title">Hi, {userName}!</h1>
                    <p className="subtitle">February 14, 2024</p>
                </div>
            </div>
            <div className="body-container">
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

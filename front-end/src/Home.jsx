import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from './NavBar';
import HomeCard from './HomeCard';
import logo from './icons/favicon.png';
import './Medicines.css';

function Home() {
    const [userName, setUserName] = useState(''); // Add state to hold the user's name
    const [date, setDate] = useState('')
    const [intakeListToTake, setIntakeListToTake] = useState([])
    const [error, setError] = useState('')
    
    useEffect(() => {
        // Fetch user settings to get the user's name
        const fetchUserSettings = async() => {
            const response = await fetch(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/user-settings`);
            if (response.ok) {
                const userSettings = await response.json();
                console.log("User settings fetched:", JSON.stringify(userSettings, null, 2)); // Detailed logging
                setUserName(userSettings.firstName); 
            } else {
                console.error('Failed to fetch user settings');
            }
        }

        // Fetch medications
        const fetchIntakeListToTake = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/home`);
                console.log('intakeListToTake: ', response.data.intakeListToTake);
                setIntakeListToTake(response.data.intakeListToTake)
                setDate(response.data.currDate)
            } catch (err) {
                console.log(err);
                setError(`Failed to fetch medications to take today! \n${err}`);
            }
        };
        fetchUserSettings(); 
        fetchIntakeListToTake(); 
    }, []);

    return (
        <div className="home-page">
            <div className="half-color-bg">
                <img className="app-logo" src={logo} alt="app logo" />
                <div className="page-header">
                    {/* Use the dynamically fetched user's name */}
                    <h1 className="title">Hi, {userName}!</h1>
                    <p className="subtitle">{date}</p>
                </div>
            </div>
            <div className="body-container">
                <h2>Today's Medicines</h2>
                <div className="medications-container">
                    {error && <p className="error-message">{error}</p>} 
                    {intakeListToTake.map((intake) => (
                        <HomeCard
                            key={intake.medID + intake.time}
                            name={intake.medName}
                            photoURL={intake.photo}
                            schedule={intake.time}
                            dose={intake.dose}
                        />
                    ))}
                </div>
                <NavBar />
            </div>
        </div>
    );
}

export default Home;

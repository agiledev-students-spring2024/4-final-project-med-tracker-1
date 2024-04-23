import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import HomeCard from './HomeCard';
import logo from './icons/favicon.png';
import './Medicines.css';

function Home() {
    const [userName, setUserName] = useState('');
    const [date, setDate] = useState('');
    const [intakeListToTake, setIntakeListToTake] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserSettings = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setError('Authentication error: No token found.');
                navigate('/login'); 
                return;
            }
            try {
                const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/api/user-settings`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (response.status === 200) {
                    setUserName(response.data.firstName);
                } else {
                    setError('Failed to fetch user settings.');
                }
            } catch (error) {
                setError('Error fetching user settings: ' + error.message);
            }
        };

        const fetchIntakeListToTake = async () => {
            const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/home`, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem("token")}` }
            });
            setIntakeListToTake(response.data.intakeListToTake);
            setDate(response.data.currDate);
        };

        fetchUserSettings();
        fetchIntakeListToTake();
    }, []);

    const handleCardClick = (id) => {
        console.log(`Clicked on card with id: ${id}`);
        // You could add any functionality here, or leave it as just a log for now
    };

    return (
        <div className="home-page">
            <div className="half-color-bg">
                <img className="app-logo" src={logo} alt="app logo" />
                <div className="page-header">
                    <h1 className="title">Hi, {userName}!</h1>
                    <p className="subtitle">{date}</p>
                </div>
            </div>
            <div className="body-container">
                <h2>Today's Medicines</h2>
                <div className="medications-container">
                    {error && <p className="error-message">{error}</p>}
                    {intakeListToTake.map(obj => (
                        <HomeCard
                            key={obj._id}
                            _id={obj._id}
                            name={obj.medicine.medName}
                            photoURL={obj.medicine.photo}
                            schedule={obj.intake.time}
                            dose={obj.intake.dose}
                            unit={obj.medicine.unit}
                            onClick={() => handleCardClick(obj._id)}
                        />
                    ))}
                </div>
                <NavBar />
            </div>
        </div>
    );
}

export default Home;

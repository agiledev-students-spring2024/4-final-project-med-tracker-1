import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const MedicationCard = ({ medID, name, photoURL, pillsLeft, unit, frequency, interval }) => {
    const [schedule, setSchedule] = useState('');
    const navigate = useNavigate();

    const parseFreq = () => {
        if (frequency === 'regular')
            setSchedule(`Every ${interval} day(s)`)
        else if (frequency === 'specific')
            setSchedule('Specific days of week')
        else if (frequency === 'as-needed')
            setSchedule('Take as needed')
        else
            setSchedule('Undefined')
    }

    useEffect(() => {
        parseFreq();
    }, [])
    const navToEdit = (event) => {
        event.preventDefault();
        navigate(`/edit-medicine-1/${medID}`)
    }
    return (
        <div className="medication-card" 
            key={medID} 
            onClick={event => navToEdit(event, name)}
        >
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{pillsLeft} {unit} left</p>
                <p>{schedule}</p>
            </div>
            {photoURL ? (
                <img className="medication-image" src={`${process.env.REACT_APP_SERVER_HOSTNAME}/med-images/${photoURL}`} alt="med image"/>
            ) : (
                <div className="medication-image">{/* Placeholder */}</div>
            )}
        </div>
    );
};

export default MedicationCard;

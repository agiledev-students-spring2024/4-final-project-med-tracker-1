import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const MedicationCard = ({ key, name, pillsLeft, unit, frequency, interval }) => {
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
    const navToEdit = (event, name) => {
        event.preventDefault();
        // send the med name to backend
        navigate('/edit-medicine-1')
    }
    return (
        <div className="medication-card" 
            key={key} 
            onClick={event => navToEdit(event, name)}
        >
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{pillsLeft} {unit} left</p>
                <p>{schedule}</p>
            </div>
            <div className="medication-image">
                {/* Placeholder for medication image */}
            </div>
        </div>
    );
};

export default MedicationCard;

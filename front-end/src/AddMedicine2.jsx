import React, {useState} from "react";
import { useNavigate } from 'react-router-dom'
import Input from "./Input";
import './AddMedicine.css'

function Intake(props) {
    const [time, setTime] = useState('');
    const [dose, setDose] = useState('');
    return(
        <div className="intake-info">
            <div className="form-group">
            <p className="input-label">Intake {props.cnt}</p>
            <label htmlFor="timePicker">Time</label>
            <Input 
                type="time" 
                id="timePicker" 
                value={time} 
                step="300"
                onChange={(e) => setTime(e.target.value)}
            />
            </div>
            <div className="form-group">
            <label htmlFor="dosePicker">Dose</label>
            <Input 
                type="number" 
                id="dosePicker" 
                value={dose} 
                onChange={(e) => setDose(e.target.value)}
            />
            </div>
        </div>
    )
}
function AddMedicine2() {
    const [frequency, setFrequency] = useState('');  
    const [refillAmt, setRefillAmt] = useState('');
    const navigate = useNavigate();

    const handleFrequency = inputVal => {
        if (inputVal === "Once daily")
            setFrequency(1)
        else if (inputVal === "Twice daily")
            setFrequency(2)
        else if (inputVal === "Take as needed")
            setFrequency(0)
        else
            return;
    }

    const handleExit = (event) => {
        event.preventDefault();
        navigate('/medicines')
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate('/medicines')
    }

    return(
        <>
        <button type="button" onClick={handleExit} className="exit-button">X</button>
        <div className="set-reminder-page">
        <div className="intake-info">
            <form>
                <div className="form-group">
                    <label htmlFor="frequency">Frequency of Intake</label>
                    <select
                    className="select-dropdown"
                    id="frequency"
                    onChange={(e) => handleFrequency(e.target.value)}
                    >
                    <option value="Once daily">Once daily</option>
                    <option value="Twice daily">Twice daily</option>
                    <option value="Multiple times daily">Multiple times daily</option>
                    <option value="Take as needed">Take as needed</option>
                    <option value="Other">Other</option>
                    </select>
                </div>
                    {[1,2].includes(frequency) ? (
                        <br></br>
                    ) : (
                        <div className="form-group">
                            <label htmlFor="multipleFreq">Number of times daily</label>
                            <Input 
                                type="number" 
                                id="multipleFreq" 
                                placeholder="3" 
                                value={frequency}
                                onChange={(e) => setFrequency(e.target.value)}
                            />
                        </div>
                    )}
                <div className="intake-groups">
                    {[...Array(frequency)].map((_, index) => (
                        <Intake key={index} cnt={index + 1} />
                    ))}
                </div>
                <div className="form-group">
                    <label htmlFor="setRefill">Remind to refill when</label>
                    <Input 
                        type="number" 
                        id="setRefill" 
                        value={refillAmt} 
                        onChange={(e) => setRefillAmt(e.target.value)}
                    />
                    <p className="input-label">pill(s) left</p>
                </div>
                <button className="clickable-button" type="submit" onClick={handleFormSubmit}>Save</button> 
            </form>
        </div>
        </div>
        </>
    )
}

export default AddMedicine2;
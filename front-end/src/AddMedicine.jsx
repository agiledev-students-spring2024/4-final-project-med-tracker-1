import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Input from "./Input";
import './AddMedicine.css'


export const AddMedicine1 = () => {
  const [medName, setMedName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [unit, setUnit] = useState('');    
  const [mockPhotoUrl, setMockPhotoUrl] = useState('');
  const navigate = useNavigate();

  const handlePhotoChange = () => {
    const randomImageId = Math.floor(Math.random() * 1000); 
    const picsumUrl = `https://picsum.photos/200`;
    setMockPhotoUrl(picsumUrl);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate('/add-medicine-2')
  }

  const handleExit = (event) => {
    event.preventDefault();
    navigate('/medicines')
  }
  return (
    <div className="add-medicine-page-1 full-color-bg">
      <div className="pop-up-white-bg med-input-container">
        <button type="button" onClick={handleExit} className="round-btn exit-btn">X</button>
        <form className="photo-upload" onSubmit={handleFormSubmit}>
          {mockPhotoUrl ? (
            <img className="med-image" src={mockPhotoUrl} alt="Uploaded" />
          ) : (
            <div className="med-image"></div>
          )}
          <button type="submit" className="white-btn" onClick={handlePhotoChange}>Upload Photo</button>
        </form>
        <form className="input-form med-info-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="medName">Name</label>
            <Input
              type="text"
              id="medName"
              placeholder="Medicine name"
              value={medName}
              onChange={(e) => setMedName(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="totalAmount">Total Amount</label>
            <Input
              type="number"
              id="totalAmount"
              placeholder="100"
              value={totalAmount}
              onChange={(e) => setTotalAmount(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <select
              className="select-dropdown"
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            >
              <option value="pill(s)">pill(s)</option>
              <option value="capsule(s)">capsule(s)</option>
              <option value="g">g</option>
              <option value="mg">mg</option>
              <option value="ml">mL</option>
            </select>
          </div>
        <button type="submit" className="blue-btn next-btn">Next</button>
      </form>  
      </div>
    </div>
  );
}

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

export const AddMedicine2 = () => {
    const [frequency, setFrequency] = useState('');  
    const [refillAmt, setRefillAmt] = useState('');
    const navigate = useNavigate();

    const handleFrequency = value => {
      setFrequency(value)
    }

    const handleExit = (event) => {
        event.preventDefault();
        navigate('/medicines')
    }    
    const navPrev = (event) => {
      event.preventDefault();
      navigate('/add-medicine-1')
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        navigate('/add-medicine-3')
    }

    function SelectInterval() {
      return(
        <div className="interval-of-intake">
          <label>Select Interval of Intake</label>
          <div className="input-group">
            <span>Every</span>
            <input type="number" min="1" defaultValue="1" />
            <span>day(s)</span>
          </div>
        </div>    
      )
    }

    function SelectDaysOfWeek() {
      const [selectedDays, setSelectedDays] = useState([]);

      const toggleDay = (event, index) => {
        event.preventDefault()
        setSelectedDays((prevSelectedDays) =>
          prevSelectedDays.includes(index)
            ? prevSelectedDays.filter(d => d !== index) 
            : [...prevSelectedDays, index]
        );
      };

      const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

      return (
        <div className="days-of-week">
          <label>Select Days of Week</label>
          <ul className="days input-group">
            {days.map((day, index) => (
              <li 
                id={index}
                key={index} 
                tabIndex="0" 
                role="button" 
                className={selectedDays.includes(index) ? 'selected' : ''} 
                onClick={(event) => toggleDay(event, index)}
                onKeyDown={(e) => (e.key === 'Enter' ? toggleDay(index) : null)}
              >
                {day}
              </li>
            ))}
          </ul>
        </div>
      );
    }

    return(
        <div className="add-medicine-page-2 full-color-bg">
          <div className="pop-up-white-bg med-input-container">
            <button className="round-btn exit-btn" type="button" onClick={handleExit}>X</button>
            <button className="round-btn prev-btn" type="button" onClick={navPrev}>&lt;</button>
            <form className="med-info-form input-form">
              <div className="form-group refill-input">
                  <label htmlFor="setRefill">Remind to refill when</label>
                  <div className="input-group">
                    <Input 
                        type="number" 
                        id="setRefill" 
                        value={refillAmt} 
                        placeholder="10"
                        onChange={(e) => setRefillAmt(e.target.value)}
                    />
                    <span className="input-label">pill(s) left</span>
                  </div>
              </div>
              <div className="form-group frequency-of-intake">
                <label>Frequency of Intake</label>
                <ul className="input-group options">
                  <li 
                    tabIndex="0" 
                    role="button" 
                    className={frequency === 'regular' ? 'active' : ''}
                    onClick={() => handleFrequency('regular')}
                    onKeyDown={(e) => (e.key === 'Enter' ? handleFrequency('regular') : null)}
                  >
                    Regular interval
                  </li>
                  <li 
                    tabIndex="0" 
                    role="button" 
                    className={frequency === 'specific' ? 'active' : ''}
                    onClick={() => handleFrequency('specific')}
                    onKeyDown={(e) => (e.key === 'Enter' ? handleFrequency('specific') : null)}
                  >
                    Specific days of week
                  </li>
                  <li 
                    tabIndex="0" 
                    role="button" 
                    className={frequency === 'as-needed' ? 'active' : ''}
                    onClick={() => handleFrequency('as-needed')}
                    onKeyDown={(e) => (e.key === 'Enter' ? handleFrequency('as-needed') : null)}
                  >
                    As needed
                  </li>
                </ul>
              </div>
              <div className="form-group interval-input">
                {frequency === 'regular' && (
                  <SelectInterval />
                )}
                {frequency === 'specific' && (
                  <SelectDaysOfWeek/>
                )}               
              </div> 
              <button className="blue-btn next-btn" type="submit" onClick={handleFormSubmit}>Next</button> 
            </form>
          </div>
        </div>
    )
}

export const AddMedicine3 = () => {
  const [intakeList, setIntakeList] = useState([]);
  const navigate = useNavigate(); 
  const handleExit = (event) => {
      event.preventDefault();
      navigate('/medicines')
  }    
  const navPrev = (event) => {
    event.preventDefault();
    navigate('/add-medicine-2')
  }

  const NewIntake = (props) => {
    const [dose, setDose] = useState('');
    const [time, setTime] = useState('')
    return(
      <div className="intake-card medication-card input-form">
          <div className="form-group refill-input">
            <label htmlFor="dose">Dose</label>
            <div className="input-group">
              <Input
                type="number"
                id="dose"
                placeholder="1"
                value={dose}
                onChange={(e) => setDose(e.target.value)} />
              <span className="input-label">{props.unit}</span>
            </div>
          </div>
          <div className="form-group intake-time">
            <label htmlFor="time">Time</label>
            <Input
              type="time"
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)} />
          </div>

          
      </div>
    )
  }
  const handleAddIntake = () => {
    setIntakeList(prevIntakeList => [...prevIntakeList, {}]);
  }
  
  const handleFormSubmit = (event) => {
    event.preventDefault();
    navigate('/medicines')
  }
  return(
    <div className="add-medicine-page-3 full-color-bg">
      <div className="pop-up-white-bg med-input-container">
        <button className="round-btn exit-btn" type="button" onClick={handleExit}>X</button>
        <button className="round-btn prev-btn" type="button" onClick={navPrev}>&lt;</button>
        <form className="intake-list-container med-info-form">
          <button className="white-btn" type="button" onClick={handleAddIntake}>Add One Intake</button>
            {intakeList.map((index) => (
              <NewIntake key={index} unit="pill(s)"/>
            ))}
          <button className="blue-btn next-btn" type="submit" onClick={handleFormSubmit}>Save</button>
        </form>  
      </div>
    </div>
  )
}
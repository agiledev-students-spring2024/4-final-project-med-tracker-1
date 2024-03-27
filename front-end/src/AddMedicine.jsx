import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './AddMedicine.css'


export const AddMedicine1 = () => {
  const [medName, setMedName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [unit, setUnit] = useState('pill(s)');    
  const [mockPhotoUrl, setMockPhotoUrl] = useState('');
  const navigate = useNavigate();

  const handlePhotoChange = () => {
    const randomImageId = Math.floor(Math.random() * 1000); 
    const picsumUrl = `https://picsum.photos/200`;
    setMockPhotoUrl(picsumUrl);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const medicine = {medName: medName, photo: mockPhotoUrl, totalAmt: totalAmount, unit: unit};
    // send the medicine info to the backend and save
    console.log(medicine);
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
        <form className="photo-upload">
          {mockPhotoUrl ? (
            <img className="med-image" src={mockPhotoUrl} alt="Uploaded" />
          ) : (
            <div className="med-image"></div>
          )}
          <button 
            type="submit" 
            className="white-btn" 
            onClick={handlePhotoChange}
          >
            Upload Photo
          </button>
        </form>
        <form className="input-form med-info-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="medName">Name</label>
            <input
              type="text"
              id="medName"
              placeholder="Medicine name"
              value={medName}
              onChange={(e) => setMedName(e.target.value)}
            />           
          </div>
          <div className="form-group">
            <label htmlFor="totalAmount">Total Amount</label>
            <input
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

export const AddMedicine2 = () => {
  const [med, setMed] = useState('');
  const [frequency, setFrequency] = useState('');  
  const [refillAmt, setRefillAmt] = useState('');
  const [interval, setInterval] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [numIntake, setNumIntake] = useState('');
  const navigate = useNavigate();

  // fetch the medicine info filled in page one from backend
  const fetchMedicine = () => {
    const updatedMed = {medName: "Zinc", photo: 'photoURL', totalAmt: 35, unit: "pill(s)"}
    setMed(updatedMed);
  }
  useEffect(() => {
    fetchMedicine();
  }, []); 

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
    const newMedInfo = {
      medName: med.medName, 
      refillAmt: refillAmt, 
      frequency: frequency,
      interval: interval,
      selectedDays: selectedDays,
      numIntake: numIntake
    }
    console.log(newMedInfo);
    navigate('/add-medicine-3')
  }

  function SelectInterval() {
    return(
      <div className="interval-of-intake">
        <label>Select Interval of Intake</label>
        <div className="input-group">
          <span>Every</span>
          <input 
            type="number" 
            min="1" 
            value={interval}
            onChange={e => setInterval(e.target.value)}
          />
          <span>day(s)</span>
        </div>
      </div>    
    )
  }

  function SelectDaysOfWeek() {

    const toggleDay = (index) => {
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
              className={selectedDays.includes(index) ? 'selected' : 'unselected'} 
              onClick={() => toggleDay(index)}
              onKeyDown={(e) => (e.key === 'Enter' ? toggleDay(index) : null)}
            >
              {day}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  function SelectNumIntake() {
    return(
      <div className="interval-of-intake">
        <label>Select Number of Intakes Per Day</label>
        <div className="input-group">
          <input 
            type="number" 
            min="1" value={numIntake} 
            onChange={e => setNumIntake(e.target.value)} 
          />
          <span>intake(s)</span>
        </div>
      </div>    
    ) 
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
                  <input 
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
                  onClick={() => setFrequency('regular')}
                  onKeyDown={(e) => (e.key === 'Enter' ? setFrequency('regular') : null)}
                >
                  Regular interval
                </li>
                <li 
                  tabIndex="0" 
                  role="button" 
                  className={frequency === 'specific' ? 'active' : ''}
                  onClick={() => setFrequency('specific')}
                  onKeyDown={(e) => (e.key === 'Enter' ? setFrequency('specific') : null)}
                >
                  Specific days of week
                </li>
                <li 
                  tabIndex="0" 
                  role="button" 
                  className={frequency === 'as-needed' ? 'active' : ''}
                  onClick={() => setFrequency('as-needed')}
                  onKeyDown={(e) => (e.key === 'Enter' ? setFrequency('as-needed') : null)}
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
            <div className="form-group frequency-of-intake num-intake-input">
              {frequency !== 'as-needed' && (
                <SelectNumIntake />
              )}            
            </div> 
            <button className="blue-btn next-btn" type="submit" onClick={handleFormSubmit}>Next</button> 
          </form>
        </div>
      </div>
  )
}

export const AddMedicine3 = () => {  
  const [med, setMed] = useState('');
  const [intakeList, setIntakeList] = useState([]);
  // fetch the medicine info filled in page one from backend
  const fetchMedicine = () => {
    const updatedMed = {
      medName: "Zinc", 
      photo: 'photoURL', 
      totalAmt: 35, 
      unit: "pill(s)",
      refillAmt: 10,
      frequency: 'specific',
      interval: '',
      selectedDays: [2, 4],
      numIntake: 2
    }
    setMed(updatedMed);
  }
  useEffect(() => {
    fetchMedicine();
  }, []); 

  useEffect(() => {
    setIntakeList(Array(med.numIntake).fill().map(() => ({dose: '', time: ''})))
  }, [med])

  const navigate = useNavigate();

  const handleExit = (event) => {
    event.preventDefault();
    navigate('/medicines');
  };

  const navPrev = (event) => {
    event.preventDefault();
    navigate('/add-medicine-2');
  };

  const updateDose = (index, doseVal) => {
    setIntakeList(prevIntakeList =>
      prevIntakeList.map((intake, i) =>
        i === index ? { dose: doseVal, time: intake.time } : intake
      )
    );
  };
  
  const updateTime = (index, timeVal) => {
    setIntakeList(prevIntakeList =>
      prevIntakeList.map((intake, i) =>
        i === index ? { dose: intake.dose, time: timeVal } : intake
      )
    );
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newMedInfo = {medName: med.medName, intakeList: intakeList};
    console.log(newMedInfo);
    navigate('/medicines');
  };

  const Intake = ({ index, intake, unit }) => {
    return (
      <div className="intake-card medication-card input-form">
        <div className="form-group refill-input">
          <label htmlFor={`dose-${index}`}>Dose</label>
          <div className="input-group">
            <input
              type="number"
              id={`dose-${index}`}
              placeholder="1"
              value={intake.dose}
              onChange={e => updateDose(index, e.target.value)}
            />
            <span className="input-label">{unit}</span>
          </div>
        </div>
        <div className="form-group intake-time">
          <label htmlFor={`time-${index}`}>Time</label>
          <input
            type="time"
            id={`time-${index}`}
            value={intake.time}
            onChange={e => updateTime(index, e.target.value)}
          />
        </div>
      </div>
    );
  };

  return (
    <div className="add-medicine-page-3 full-color-bg">
      <div className="pop-up-white-bg med-input-container">
        <button className="round-btn exit-btn" type="button" onClick={handleExit}>X</button>
        <button className="round-btn prev-btn" type="button" onClick={navPrev}>&lt;</button>
        <form className="intake-list-container med-info-form" onSubmit={handleFormSubmit}>
          {intakeList[0] && intakeList.map((intake, index) => (
            <Intake key={index} index={index} intake={intake} unit="pill(s)" />
          ))}
          <button className="blue-btn next-btn" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom'
import './AddMedicine.css'

export const EditMed1 = () => {
  const [med, setMed] = useState({})
  const [totalAmt, setTotalAmt] = useState('');
  const [unit, setUnit] = useState('pill(s)'); 
  const [error, setError] = useState('');
  const { medID } = useParams();

  const fetchMed = async() => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/medicine/${medID}`);
      setMed(response.data.med);
      console.log(response.data.med);
    } catch (error) {
      console.error("Failed to fetch medication details", error);
    }
  }

  useEffect(() => {
    fetchMed();
  }, [medID])

  useEffect(() => {
    setUnit(med.unit || '')
  }, [med])

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();;
    // send the updated med info to the backend and save
    let medToUpdate = {}
    if(totalAmt !== '')
      medToUpdate.totalAmt = totalAmt;
    if(unit !== '')
      medToUpdate.unit = unit;

    try {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/medicine/update/${medID}`, medToUpdate);
        console.log("Update successful", response.data.med);
        navigate(`/edit-medicine-2/${medID}`);
    } catch (error) {
        setError("Failed to update medication", error);
    }
  }

  const handleExit = (event) => {
    event.preventDefault();
    navigate('/medicines')
  }
  const deleteMed = (event) => {
    event.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/delete-med/${medID}`)
      .then(response => {
        console.log(response.data.status)
        navigate('/medicines')
      })
      .catch(err => {
        console.log(err)
        setError(`Failed to exit the add medicine page! \n${err}`)
      })
  }
  return (
    <div className="edit-medicine-page-1 add-medicine-page-1 full-color-bg">
      <div className="pop-up-white-bg med-input-container">
        <button type="button" onClick={handleExit} className="round-btn exit-btn">X</button>
        {med.photo ? (
          <img className="med-image" src={`${process.env.REACT_APP_SERVER_HOSTNAME}/med-images/${med.photo}`} alt="Uploaded"  />
        ) : (
          <div className="med-image img-placeholder"></div>
        )}
        <form className="input-form med-info-form" onSubmit={handleFormSubmit}>
          <div className="form-group">
            <label htmlFor="medName">Name</label>
            <input
              type="text"
              id="medName"
              placeholder="Medicine name"
              defaultValue={med.medName}
            />           
          </div>
          <div className="form-group">
            <label htmlFor="totalAmount">Total Amount</label>
            <input
              type="number"
              id="totalAmount"
              placeholder={med.totalAmt}
              value={totalAmt}
              onChange={(e) => setTotalAmt(e.target.value)} />
          </div>
          <div className="form-group">
            <label htmlFor="unit">Unit</label>
            <select
              className="select-dropdown"
              id={med.unit}
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
          {error && <p className="error-message">{error}</p>} 
          <button type="button" onClick={e => deleteMed(e)} className="white-btn next-btn">Delete</button>
          <button type="submit" className="blue-btn next-btn">Next</button>
        </form>  
      </div>
    </div>
  );
}

export const EditMed2 = () => {
  const { medID } = useParams();
  const [error, setError] = useState('')

  const [med, setMed] = useState('');
  const [refillAmt, setRefillAmt] = useState('');
  const [frequency, setFrequency] = useState('');  
  const [interval, setInterval] = useState('');
  const [selectedDays, setSelectedDays] = useState([]);
  const [numIntake, setNumIntake] = useState('');
  const navigate = useNavigate();

  // fetch the medicine info filled in page one from backend
  const fetchMed = async() => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/medicine/${medID}`);
      setMed(response.data.med);
      console.log(response.data.med);
    } catch (error) {
      console.error("Failed to fetch medication details", error);
    }
  }

  useEffect(() => {
    fetchMed();
  }, [medID])

  useEffect(() => {
    setRefillAmt(med.refillAmt || '');
    setFrequency(med.frequency || '');
    setInterval(med.interval || '');
    setSelectedDays(med.selectedDays|| []);
    setNumIntake(med.numIntake|| '');
  }, [med])

  const handleExit = (event) => {
      event.preventDefault();
      navigate('/medicines')
  }    
  const navPrev = (event) => {
    event.preventDefault();
    navigate('/edit-medicine-1')
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const medToUpdate = filterEmptyProperties({
      refillAmt: refillAmt, 
      frequency: frequency,
      interval: interval,
      selectedDays: selectedDays,
      numIntake: numIntake
    })

    try {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/medicine/update/${medID}`, medToUpdate);
        console.log("Update successful", response.data.med);
        navigate(`/edit-medicine-3/${medID}`);
    } catch (error) {
        setError("Failed to update medication", error);
    }
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
            placeholder={med.interval}
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
            min="1" 
            value={numIntake} 
            placeholder={med.numIntake}
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
                      placeholder={med.refillAmt}
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
            {error && <p className="error-message">{error}</p>} 
            <button className="blue-btn next-btn" type="submit" onClick={handleFormSubmit}>Next</button> 
          </form>
        </div>
      </div>
  )
}

export const EditMed3 = () => {  
  const {medID} = useParams();
  const [med, setMed] = useState({});
  const [intakeList, setIntakeList] = useState([]);
  const [error, setError] = useState('')

  // fetch the medicine info from backend
  const fetchMed = async() => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/medicine/${medID}`);
      const updatedMed = response.data.med;
      setMed(updatedMed);
      if(Number(updatedMed.numIntake) == updatedMed.intakeList.length)
        setIntakeList(updatedMed.intakeList)
      else 
        setIntakeList(Array(Number(updatedMed.numIntake)).fill().map(() => ({ dose: '', time: '' })) || [])
    } catch (error) {
      setError("Failed to fetch medication details", error);
    }
  }

  useEffect(() => {
    fetchMed();
  }, [])

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const newMedInfo = {medName: med.medName, intakeList: intakeList};
    const medToUpdate = filterEmptyProperties({
      intakeList: intakeList
    })

    try {
        const response = await axios.put(`${process.env.REACT_APP_SERVER_HOSTNAME}/medicine/update/${medID}`, medToUpdate);
        console.log("Update successful", response.data.med);
        navigate(`/medicines`);
    } catch (error) {
        setError("Failed to update medication", error);
    }
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
          {intakeList && intakeList.map((intake, index) => (
            <Intake key={index} index={index} intake={intake} unit="pill(s)" />
          ))}
          {error && <p className="error-message">{error}</p>} 
          <button className="blue-btn next-btn" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

function filterEmptyProperties(obj) {
  return Object.entries(obj).reduce((accumulator, [key, value]) => {
    // Check if the value is not an empty string or an empty array
    if (value !== '' && !(
        Array.isArray(value) && value.length === 0
      )) {
      accumulator[key] = value;
    }
    return accumulator;
  }, {});
}

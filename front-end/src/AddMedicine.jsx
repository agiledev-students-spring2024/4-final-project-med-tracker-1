import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios';
import './AddMedicine.css'


export const AddMedicine1 = () => {
  const [medID, setMedID] = useState()
  const [medName, setMedName] = useState('');
  const [totalAmount, setTotalAmount] = useState('');
  const [unit, setUnit] = useState('pill(s)');    
  const [photo, setPhoto] = useState();
  const [imageURL, setImageURL] = useState();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const uploadPhoto = (event) => {
    event.preventDefault();
    const formData = new FormData()
    formData.append("file", photo)
    axios
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/photo-upload`, formData)
      .then(response => {
        console.log('sent photo to backend')
        console.log(response.data.photo.filename)
        setImageURL(response.data.photo.filename)
      })
      .catch(err => {
        console.log(err)
        setError(`Error with saving the data! ${err}`)
      })
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const medicine = {medName: medName, photo: imageURL, totalAmt: totalAmount, unit: unit};
    // send the medicine info to the backend and save    
    const token = localStorage.getItem("token")
    console.log(token)
    axios
      // post a new medicine to server
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/add-medicine-1/save`, medicine, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        const newMedID = response.data.med.medID
        setMedID(newMedID)
        navigate(`/add-medicine-2/${newMedID}`)
      })
      .catch(err => {
        console.log(err)
        setError(`Error with saving the data! ${err}`)
      })
  }

  const handleExit = (event) => {
    event.preventDefault();
    if(medID){
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
    else
      navigate('/medicines')
  }
  return (
    <div className="add-medicine-page-1 full-color-bg">
      <div className="pop-up-white-bg med-input-container">
        <button type="button" onClick={handleExit} className="round-btn exit-btn">X</button>
        <form className="photo-upload">
          {imageURL ? (
            <img className="med-image" src={`${process.env.REACT_APP_SERVER_HOSTNAME}/med-images/${imageURL}`} alt="Uploaded"  />
          ) : (
            <div className="med-image img-placeholder"></div>
          )}
          <input className="white-btn" type="file" onChange={e => setPhoto(e.target.files[0])}/>
          <button 
            type="submit" 
            className="blue-btn" 
            onClick={uploadPhoto}
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
        {error && <p className="error-message">{error}</p>} 
        <button type="submit" className="blue-btn next-btn">Next</button>
      </form>
      </div>
    </div>
  );
}

export const AddMedicine2 = () => {
  const { medID } = useParams();

  const [med, setMed] = useState({});
  const [frequency, setFrequency] = useState('');  
  const [refillAmt, setRefillAmt] = useState(0);
  const [interval, setInterval] = useState(0);
  const [selectedDays, setSelectedDays] = useState([]);
  const [numIntake, setNumIntake] = useState(0);
  const [error, setError] = useState('')
  const navigate = useNavigate();

  const fetchMed = async() => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/medicine/${medID}`,{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('fetched med: ', response.data.med)
      setMed(response.data.med);
    } catch (error) {
      setError("Failed to fetch medication details", error);
    }
  }

  useEffect(() => {
    fetchMed();
  }, []); 

  const handleExit = (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/delete-med/${medID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data.status)
        navigate('/medicines')
      })
      .catch(err => {
        console.log(err)
        setError(`Failed to exit the add medicine page! \n${err}`)
      })
  }    
  const navPrev = (event) => {
    event.preventDefault();
    navigate('/add-medicine-1')
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newMedInfo = {
      refillAmt: refillAmt, 
      frequency: frequency,
      interval: interval,
      selectedDays: selectedDays,
      numIntake: numIntake
    }
    axios
      // post new medicine information and send to back end
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/add-medicine-2/${medID}/save`, newMedInfo, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(() => {
        navigate(`/add-medicine-3/${medID}`)
      })
      .catch(err => {
        console.log(err)
        setError(`Error with saving the data! ${err}`)
      })
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
      {med} && <div className="add-medicine-page-2 full-color-bg">
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
                  <span className="input-label">{med.unit} left</span>
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

export const AddMedicine3 = () => {  
  const { medID } = useParams();
  const [med, setMed] = useState({});
  const [numIntake, setNumIntake] = useState(0);
  const [intakeList, setIntakeList] = useState([]);
  const [error, setError] = useState('')

  // fetch the medicine info filled in previous pages from backend
  const fetchMed = async() => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_SERVER_HOSTNAME}/medicine/${medID}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      });
      const updatedMed = response.data.med;
      setMed(updatedMed);
      setIntakeList(Array(Number(updatedMed.numIntake)).fill().map(() => ({ dose: '', time: '' })) || [])
    } catch (error) {
      setError("Failed to fetch medication details", error);
    }
  }

  useEffect(() => {
    fetchMed();
  }, []); 

  const navigate = useNavigate();

  const handleExit = (event) => {
    event.preventDefault();
    axios
      .delete(`${process.env.REACT_APP_SERVER_HOSTNAME}/delete-med/${medID}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        console.log(response.data.status)
        navigate('/medicines')
      })
      .catch(err => {
        console.log(err)
        setError(`Failed to exit the add medicine page! \n${err}`)
      })
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
    const newMedInfo = {intakeList: intakeList};
    axios
      // post new medicine information and send to back end
      .post(`${process.env.REACT_APP_SERVER_HOSTNAME}/add-medicine-2/${med.medID}/save`, newMedInfo, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        }
      })
      .then(response => {
        console.log('final med: ', response.data.med)
        navigate('/medicines')
      })
      .catch(err => {
        console.log(err)
        setError(`Error with saving the data! ${err}`)
      })
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
        <form className="med-info-form" onSubmit={handleFormSubmit}>
          <div className="intake-list-container">
          {intakeList.length > 0 && intakeList.map((intake, index) => (
            <Intake key={index} index={index} intake={intake} unit={med.unit} />
          ))}
          {error && <p className="error-message">{error}</p>} 
          </div>
          <button className="blue-btn next-btn" type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

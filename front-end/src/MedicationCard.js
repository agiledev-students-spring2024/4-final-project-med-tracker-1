import React, { useState } from 'react';
import './MedicationCard.css'; // make sure to create a corresponding CSS file

const MedicationCard = () => {
    const [pillsLeft, setPillsLeft] = useState(26);

    // Function to decrement the pill count
    const takePill = () => {
        setPillsLeft((prevPillsLeft) => (prevPillsLeft > 0 ? prevPillsLeft - 1 : 0));
    };

    return (
        <div className="medication-card">
            <div className="medication-info">
                <h1>Midol</h1>
                <button onClick={takePill}>{pillsLeft} pill(s) left</button>
                <p>Once daily</p>
            </div>
            <div className="medication-image">
                {/* Placeholder for medication image */}
            </div>
        </div>
    );
};

export default MedicationCard;

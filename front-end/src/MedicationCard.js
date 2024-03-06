import React, { useState } from 'react';
import './MedicationCard.css';

const MedicationCard = ({ name, pillsLeft, schedule }) => {
    return (
        <div className="medication-card">
            <div className="medication-info">
                <h1>{name}</h1>
                <p>{pillsLeft} pill(s) left</p>
                <p>{schedule}</p>
            </div>
            <div className="medication-image">
                {/* Placeholder for medication image */}
            </div>
        </div>
    );
};


// const MedicationCard = (props) => {
//     const [pillsLeft, setPillsLeft] = useState(26);

//     // Function to decrement the pill count
//     // const takePill = () => {
//     //     setPillsLeft((prevPillsLeft) => (prevPillsLeft > 0 ? prevPillsLeft - 1 : 0));
//     // };

//     return (
//         <div className="medication-card">
//             <div className="medication-info">
//                 <h1>Midol</h1>
//                 <button onClick={takePill}>{pillsLeft} pill(s) left</button>
//                 <p>Once daily</p>
//             </div>
//             <div className="medication-image">
//                 {/* Placeholder for medication image */}
//             </div>
//         </div>
//     );
// };

export default MedicationCard;

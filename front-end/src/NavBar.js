import React from 'react';
import { Link } from 'react-router-dom'
import './NavBar.css'

const NavBar = props => {
    return(
        <>
            <nav className="nav-bar">
                <ul className="nav-links">
                    <li className="nav-item">
                        Home{/* <Link to="/">Home</Link> */}
                    </li>
                    <li className="nav-item">
                        History{/* <Link to="/history">History</Link> */}
                    </li>
                    <li className="nav-item">
                        Medicines {/* <Link to="/medicines">Medicines</Link> */}
                    </li>
                    <li className="nav-item">
                        Setting {/* <Link to="/Setting">Setting</Link> */}
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default NavBar;
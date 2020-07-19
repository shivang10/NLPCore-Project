import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';

const NavBar = () => {
    return (
        <div>
            <nav className="navbar">
                <ul>
                    <li><Link to="/">HomePage</Link></li>
                    <li><Link to="/titlesPublished">Task1</Link></li>
                    <li><Link to="topAttributes">Task4</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default NavBar;
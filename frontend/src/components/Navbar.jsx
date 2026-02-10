
import React from "react";
import "../style/Navbar.css" // We'll style it here
import Dropdown  from "./Dropdown"
import {BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom'
function Navbar() {
  return (
    <>
      <nav className="navbar">
        <div className="logo">
                  <div className="logo-name">Micro-Z</div>

        </div>

        <input type="checkbox" id="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger">&#9776;</label>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/service">Service</Link></li>
          <li><Dropdown /></li>
          


        </ul>
      </nav>


    </>
  );
}

export default Navbar;

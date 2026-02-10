import { useState } from "react";
import "../style/Dropdown.css"
import {BrowserRouter as Router, Routes, Route ,Link} from 'react-router-dom'
function Dropdown() {
  const [open, setOpen] = useState(false);

  return (
    <div className="dropdown">
      <button
        className="dropdown-btn"
        onClick={() => setOpen(!open)}
      >
        ☰ Account
      </button>

      {open && (
        <div className="dropdown-menu">



          <Link to="/register"><button className="dropdown-item">Register</button></Link> |{" "}
          <Link to="/login"><button className="dropdown-item">Login</button></Link> |{" "}
          <Link to="/profile"><button className="dropdown-item">Profile</button></Link>
        </div>
      )}
    </div>
  );
}

export default Dropdown;

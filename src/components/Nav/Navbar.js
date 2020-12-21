import React from "react";
import { NavLink as Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div id="nav-container">
      <ul className="navbar">
        <li className="nav-item">
          <Link to="/sign-in">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="sign-up">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

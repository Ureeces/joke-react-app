import React, { useState } from "react";
import { NavLink as Link } from "react-router-dom";

import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState("");

  return (
    <div id="nav-container">
      <ul className="navbar">
        <li className="nav-item">
          <Link to="/sign-in">Login</Link>
        </li>
        <li className="nav-item">
          <Link to="/sign-up">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

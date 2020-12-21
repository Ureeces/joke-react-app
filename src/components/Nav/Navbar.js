import React, { useContext, useEffect } from "react";
import { NavLink as Link } from "react-router-dom";

import useLocalStorage from "../hooks/useLocalStorage";

import AuthContext from "../context/AuthContext";

import "./Navbar.css";

const Navbar = () => {
  const {
    state: { user },
    dispatch,
  } = useContext(AuthContext);

  const [, , jwtDecodeFunc] = useLocalStorage("jwtToken");

  const isUserLoggedIn = user ? true : false;

  const navLinkPathOne = isUserLoggedIn ? "/home" : "/sign-in";
  const navLinkDisplayOne = isUserLoggedIn ? `${user.username}` : "LOGIN";

  const navLinkPathTwo = isUserLoggedIn ? "/logout" : "/sign-up";
  const navLinkDisplayTwo = isUserLoggedIn ? `LOGOUT` : "REGISTER";

  const logoutFunc = isUserLoggedIn ? logout : null;

  useEffect(() => {
    let token = localStorage.getItem("jwtToken");

    if (!token) {
      return;
    }

    if (token.length > 0) {
      let decoded = jwtDecodeFunc(token);
      dispatch({
        type: "LOGIN",
        user: decoded,
      });
    }
  }, []);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });

    localStorage.removeItem("jwtToken");
  };

  return (
    <div id="nav-container">
      <ul className="navbar">
        <li className="nav-item">
          <Link to="/joke">MAKE ME LAUGH</Link>
        </li>
        <li className="nav-item">
          <Link exact to={navLinkPathOne} onClick={logoutFunc}>
            {navLinkDisplayOne}
          </Link>
        </li>
        <li className="nav-item">
          <Link exact to={navLinkPathTwo}>
            {navLinkDisplayTwo}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

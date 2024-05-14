import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <h1>Tir.AI</h1>
      <div className="links">
        <nav>
          <ul>
            <li>
              <NavLink activeClassName="active" to="/features">
                Features
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/howitworks">
                How It Works
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/pricing">
                Pricing
              </NavLink>
            </li>
            <li>
              <NavLink activeClassName="active" to="/">
                Account
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Header;
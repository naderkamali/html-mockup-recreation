import React from "react";
import { NavLink } from "react-router-dom";

const Masthead = () => {
  return (
    <div className="masthead">
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
              <a href="#account">Account</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Masthead;
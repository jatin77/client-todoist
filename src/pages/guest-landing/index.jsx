import React from "react";
import { NavLink, Route, Switch } from "react-router-dom";
import "./style.scss";

const GuestLanding = ({ match, children }) => {
  return (
    <div className="guestLanding">
      {/* <LandingSlides /> */}
      <div className="guestLanding__auth  d-flex justify-content-center pt-5 px-2">
        <div className="wrapper">
          <NavLink
            to={`/login`}
            className="t_heading-smLink t-text py-2 mr-4"
            activeClassName="t_heading-smLink-active"
          >
            login
          </NavLink>
          <NavLink
            to={`/register`}
            className="t_heading-smLink t-text py-2"
            activeClassName="t_heading-smLink-active"
          >
            Register
          </NavLink>
          <div className="guestLanding__auth__form">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default GuestLanding;

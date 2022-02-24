import { Link } from "react-router-dom";
import React, { useState, useContext } from "react";
import { SessionContext } from "../../context/SessionContext";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";

const Navbar = () => {
  const history = useHistory();
  const {toggleSession, session} = useContext(SessionContext);
  const alert = useAlert();

  const logout = () => {
    toggleSession(false);
    window.location.reload(false);
    alert.success("Disconnected");
  }

  console.log("test")

  return (
    <nav className="navbar" >
      <Link className="human" to="/">HUMAN.</Link>
      {session?
        <>
        <button id="logout" className="btn-pages logout" type="button" onClick={logout}>Logout</button>
          <Link className="btn-pages" to="/cart">Cart</Link>
          <Link className="btn-pages" to="/profile">Profile</Link>
        </>
        :
        <>
          <Link className="btn-pages" to="/login">Login</Link>
          <Link className="btn-pages" to="/signup">Signup</Link>
        </>
      }
      <Link className="btn-pages" to="/concept">Concept</Link>
      <Link className="btn-pages" to="/products">Shop</Link>
    </nav>
)};

export default Navbar;

import React from 'react';
import icon from "../assets/agenstOfShield.svg" 
import './navbar.css'

export function Navbar(){
  return (
    <nav className="bg-dark navbar navbar-expand-lg navbar-dark navbar-bg justify-content-between">
      <a className="navbar-brand" href="#">Babeld</a>
      <img className='icon' src={icon} alt="icon" />
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    </nav>
  )
}


import React from 'react'

import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'

import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className='navbar_logo'>
            <img src={Logo} alt="Get a Pet" />
            <h2>Adote um Pet</h2>
        </div>
        <ul>
            <li><Link to="/">Adotar</Link></li>
            <li><Link to="/login">Entrar</Link></li>
            <li><Link to="/register">Cadastrar</Link></li>
        </ul>
    </nav>
  )
}

export default Navbar
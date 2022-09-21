import React, { useContext } from 'react'

import { Link } from 'react-router-dom'
import Logo from '../../assets/img/logo.png'

//Context do Usuário
import { Context } from '../../context/UserContext';

import "./Navbar.css";

const Navbar = () => {

  const { authenticated, logout } = useContext(Context)

  return (
    <nav className='navbar'>
        <div className='navbar_logo'>
            <img src={Logo} alt="Get a Pet" />
            <h2>Adote um Pet</h2>
        </div>
        <ul>
            <li><Link to="/">Adotar</Link></li>

            {authenticated ? (
              <>
                <li onClick={logout}>Sair</li>
                <li><Link to="/user/profile">Perfil</Link></li>
              </>
              ) : (
              <>
                <li><Link to="/login">Entrar</Link></li>
                <li><Link to="/register">Cadastrar</Link></li>
              </>
            )
            
            
            }

            
        </ul>
    </nav>
  )
}

export default Navbar
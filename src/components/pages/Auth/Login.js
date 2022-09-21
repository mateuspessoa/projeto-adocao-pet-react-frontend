import React from 'react'
import { useState, useContext } from 'react'
import Input from '../../form/Input'
import '../../form/Form.css'

import { Context } from '../../../context/UserContext'
import { Link } from 'react-router-dom'

const Login = () => {

  const [user, setUser] = useState({})
  const {login} = useContext(Context)

  function handleOnChange (e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(user)
  }

  return (
    <section className='form_container'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input text="Email" type="email" name="email" placeholder="Digite o seu email" handleOnChange={handleOnChange}/>
          <Input text="Senha" type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleOnChange}/>

          <input type="submit" value="Entrar" />
        </form>
        <p>Não tem uma conta? <Link to="/register" >Cadastre-se</Link></p>
    </section>
  )
}

export default Login
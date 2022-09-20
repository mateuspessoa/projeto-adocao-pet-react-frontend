import { useState } from 'react';

import React from 'react'
import Input from '../../form/Input'

import { Link } from 'react-router-dom'

import "../../form/Form.css";

const Register = () => {

  const [user, setUser] = useState({})

  //Formando o usuário através dos dados que são digitados no input para enviar ao back-end
  function handleOnChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    
    //Enviar o usuário para o banco
    console.log(user)
  }

  return (
    <section className='form_container'>
        <h1>Registrar</h1>

        <form onSubmit={handleSubmit}>
            <Input text="Nome" type="text" name="name" placeholder="Digite o seu nome" handleOnChange={handleOnChange} />
            <Input text="Telefone" type="text" name="phone" placeholder="Digite o seu telefone" handleOnChange={handleOnChange} />
            <Input text="Email" type="email" name="email" placeholder="Digite o seu email" handleOnChange={handleOnChange} />
            <Input text="Senha" type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleOnChange} />
            <Input text="Confirmação de Senha" type="password" name="confirmpassword" placeholder="Confirme a sua senha" handleOnChange={handleOnChange} />
            <input type="submit" value="Cadastrar" />
        </form>

        <p>Já tem uma conta? <Link to='/login'>Faça o Login</Link></p>

    </section>
  )
}

export default Register
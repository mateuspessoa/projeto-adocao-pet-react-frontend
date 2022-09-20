import React from 'react'
import Input from '../../form/Input'

import { Link } from 'react-router-dom'

import "../../form/Form.css";

const Register = () => {

  function handleOnChange(e) {

  }

  return (
    <section className='form_container'>
        <h1>Registrar</h1>

        <form>
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
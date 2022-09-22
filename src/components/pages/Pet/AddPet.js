import api from '../../../utils/api'

import { useState } from 'react'
import { Navigate } from 'react-router-dom'

/* Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

import './AddPet.css'

const AddPet = () => {
  return (
    <section className='addpet_header'>
        <div>
            <h1>Cadastre um Pet</h1>
            <p>Depois ele ficará disponível para adoção</p>
        </div>

        <p>Formulário</p>
    </section>
  )
}

export default AddPet
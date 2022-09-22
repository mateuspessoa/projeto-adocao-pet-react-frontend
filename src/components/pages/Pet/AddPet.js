import api from '../../../utils/api'

import { useState } from 'react'
import { Navigate } from 'react-router-dom'

/*Componentes*/
import PetForm from '../../form/PetForm'

/* Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

import './AddPet.css'
import Select from '../../form/Select'

const AddPet = () => {
  return (
    <section className='addpet_header'>
        <div>
            <h1>Cadastre um Pet</h1>
            <p>Depois ele ficará disponível para adoção</p>
        </div>

        <PetForm btnText="Cadastrar" />
    </section>
  )
}

export default AddPet
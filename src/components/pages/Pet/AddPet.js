import api from '../../../utils/api'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

/*Componentes*/
import PetForm from '../../form/PetForm'

/* Hooks */
import useFlashMessage from '../../../hooks/useFlashMessage'

import './AddPet.css'

const AddPet = () => {

  //State para pegar o Token do localStorage
  const [token] = useState(localStorage.getItem('token') || '')

  //Função para exibir a mensagem de sucesso ou erro
  const {setFlashMessage} = useFlashMessage()

  //Serve para redirecionar para alguma página após o cadastro
  const navigate = useNavigate()

  //Função para registrar pet no banco de dados
  async function registerPet(pet) {
    let msgType = 'success'

    const formData = new FormData()

    //Serve para pegar cada item do pet e jogar no formData para que ele consiga fazer o upload de imagens
    await Object.keys(pet).forEach((key) => {
      if(key === 'images') {
        for(let i = 0; i < pet[key].length; i++) {
          formData.append('images', pet[key][i])
        }
      } else {
        formData.append(key, pet[key])
      }
    })

    const data = await api.post('pets/create', formData, {
      Authorization: `Bearer ${JSON.parse(token)}`,
      'Content-Type': 'multipart/form-data'
    })
    .then((response) => {
      return response.data
    })
    .catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)

    if(msgType !== 'error') {
      navigate('/pet/mypets')
    }
  }

  return (
    <section className='addpet_header'>
        <div>
            <h1>Cadastre um Pet</h1>
            <p>Depois ele ficará disponível para adoção</p>
        </div>
        <PetForm handleSubmit={registerPet} btnText="Cadastrar" />
    </section>
  )
}

export default AddPet
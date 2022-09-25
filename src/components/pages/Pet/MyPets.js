import './Dashboard.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RoundedImage from '../../layout/RoundedImage'
import api from '../../../utils/api'

/*Import de Hooks*/
import useFlashMessage from '../../../hooks/useFlashMessage'

const MyPets = () => {

  //State para armazenar os pets
  const [pets, setPets] = useState([])

  //State para pegar o token e armazenar
  const [token] = useState(localStorage.getItem('token') || '')

  //Hooke para exibir as mensagens
  const {setFlashMessage} = useFlashMessage()

  //Função para os pets serem puxados apenas uma vez quando o usuário entra na página
  useEffect(() => {
    api.get('/pets/mypets', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    })
    .then((response) => {
      setPets(response.data.pets)
    })
  }, [token])

  //Função para excluir um pet cadastrado
  async function removePet(id) {
    let msgType = 'success'

    const data = await api.delete(`/pets/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      }
    }).then((response) => {

      //Exclui do front-end o pet que foi removido
      const updatedPets = pets.filter((pet) => pet._id !== id)
      setPets(updatedPets)

      return response.data

    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)
  }

  //Função para concluir a adoção
  async function concludeAdoption(id) {

    let msgType = 'success'

    const data = await api.patch(`/pets/conclude/${id}`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`
      },
    }).then((response) => {
      return response.data
    }).catch((err) => {
      msgType = 'error'
      return err.response.data
    })

    setFlashMessage(data.message, msgType)

  }

  return (
    <section>
      <div className='petlist_header'>
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>

      <div className='petlist_container'>
        {pets.length > 0 && 
          pets.map((pet) => (
            <div className='petlist_row' key={pet._id}>
              <RoundedImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={pet.name} width="px75" />
              <span className="bold">{pet.name}</span>

              <div className="actions">
                {pet.available ? 
                (<>
                  {pet.adopter && (
                    <button className='conclude_btn' onClick={() => {concludeAdoption(pet._id)}}>Concluir Adoção</button>
                  )}
                  <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                  <button onClick={() => {
                    removePet(pet._id)
                  }}>Excluir</button>
                </>)
               
               : <p>Pet já Adotado</p>}
              </div>
            </div>
          ))
        }
        {pets.length === 0 && <p> Não há Pets cadastrados </p>}
      </div>
    </section>
  )
}

export default MyPets
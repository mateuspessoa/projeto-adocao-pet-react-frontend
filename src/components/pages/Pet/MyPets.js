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

  return (
    <section>
      <div>
        <h1>Meus Pets</h1>
        <Link to="/pet/add">Cadastrar Pet</Link>
      </div>

      <div>
        {pets.length > 0 && 
          pets.map((pet) => (
            <div key={pet._id}>
              <RoundedImage src={`${process.env.REACT_APP_API}/images/pets/${pet.images[0]}`} alt={pet.name} width="75px" />
              <span className="bold">{pet.name}</span>

              <div className="actions">
                {pet.available ? 
                (<>
                  {pet.adopter && (
                    <button>Concluir Adoção</button>
                  )}
                  <Link to={`/pet/edit/${pet._id}`}>Editar</Link>
                  <button>Excluir</button>
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
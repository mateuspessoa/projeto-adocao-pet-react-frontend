import api from "../../utils/api"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"

import './Home.css'

const Home = () => {

  const [pets, setPets] = useState([])

  useEffect(() => {

    api.get('/pets').then((response) => {
      setPets(response.data.pets)
    })


  }, [])


  return (
    <section>
        <div>
          <h1>Adote um Pet</h1>
          <p>Veja os detalhes dos Pets e entre em contato com o tutor</p>
        </div>

        <div>
          {pets.length > 0 && 
            pets.map((pet) => (
              <div>
                <p>Imagem do Pet</p>
                <h3>{pet.name}</h3>
                <p><span className="bold">Peso: </span>{pet.weight}Kg</p>

                {pet.available ? (
                  <Link to={`pet/${pet._id}`}>Mais Detalhes</Link>
                ) : (
                  <p>Adotado</p>
                )}
              </div>
            ))
          }
          {pets.length === 0 && (
            <p>Não há pets disponíveis para adoção no momento</p>
          )}
        </div>
    </section>
  )
}

export default Home
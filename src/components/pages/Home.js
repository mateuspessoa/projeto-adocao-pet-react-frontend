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
        <div className="pet_home_header">
          <h1>Adote um Pet</h1>
          <p>Veja os detalhes dos Pets e entre em contato com o tutor</p>
        </div>

        <div className="pet_container">
          {pets.length > 0 && 
            pets.map((pet) => (
              <div className="pet_card">

                <div style={{backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`}} className="pet_card_image"></div>

                <h3>{pet.name}</h3>
                <p><span className="bold">Peso: </span>{pet.weight}Kg</p>

                {pet.available ? (
                  <Link to={`pet/${pet._id}`}>Mais Detalhes</Link>
                ) : (
                  <p className="adopter_text">Adotado</p>
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
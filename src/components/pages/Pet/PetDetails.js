import './PetDetails.css'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'

const PetDetails = () => {

    const [pet, setPet] = useState({})
    const {id} = useParams()
    const {setFlashMessage} = useFlashMessage()
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {
        api.get(`/pets/${id}`).then((response) => {
            setPet(response.data.pet)
        })
    }, [id])

  return (
    <>
        {pet.name && (
            <section>
                <div>
                    <h1>Conhecendo o Pet: {pet.name}</h1>
                    <p>Tem interesse em adotar esse pet? Marque uma visita agora mesmo</p>
                </div>

                <div>
                {pet.images.map((image, index) => (
                        <img key={index} src={`${process.env.REACT_APP_API}/images/pets/${image}`} alt={pet.name}/>
                    ))}
                </div>
                <p><span className="bold">Peso: </span>{pet.weight}Kg</p>
                <p><span className="bold">Idade: </span>{pet.age} anos</p>

                {token ? (
                    <button>Solicitar Visita</button>
                ) : (
                    <p><Link to="/register">Crie uma conta para adotar um pet</Link></p>
                )}
            </section>
        )}
    </>
  )
}

export default PetDetails
import './Dashboard.css'
import api from '../../../utils/api'
import { useState, useEffect } from 'react'
import RoundedImage from '../../layout/RoundedImage'

const MyAdoptions = () => {

    const [pets, setPets] = useState([])
    const [token] = useState(localStorage.getItem('token') || '')

    useEffect(() => {

        api.get('/pets/myadoptions', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setPets(response.data.pets)
        })

    }, [token])

  return (
    <div>
        <h1>Minhas Adoções</h1>
    </div>
  )
}

export default MyAdoptions
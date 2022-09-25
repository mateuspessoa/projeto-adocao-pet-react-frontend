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
        <h1>Página Home</h1>
    </section>
  )
}

export default Home
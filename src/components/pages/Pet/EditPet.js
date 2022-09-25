import api from "../../../utils/api"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import './AddPet'
import PetForm from "../../form/PetForm"

import useFlashMessage from "../../../hooks/useFlashMessage"

const EditPet = () => {

    //State que vai armazenar os dados do pet
    const [pet, setPet] = useState({})

    //State que vai pegar o token do usuário logado
    const [token] = useState(localStorage.getItem('token') || '')

    //Possibilita pegar o pet pelo ID
    const {id} = useParams()

    //Vai servir para exibir as mensagens
    const {setFlashMessage} = useFlashMessage()


    //Função para buscar o pet e exibir os seus dados
    useEffect(() => {

        //Esse é o id que vem da URL
        api.get(`pets/${id}`, {
           Authorization:  `Bearer ${JSON.parse(token)}`
        }).then((response) => {
            setPet(response.data.pet)
        })

    }, [token, id])

    //Função para fazer a atualização
    async function updatePet(pet) {

        let msgType = 'success'

        //Serve para enviar as imagens
        const formData = new FormData()

        //Vai preencher o formData com os dados que serão atualizados ou os que já estão
        await Object.keys(pet).forEach((key) => {
            if(key === 'images') {
                for(let i = 0; i < pet[key].length; i++) {
                    formData.append('images', pet[key][i])
                }
            } else {
                formData.append(key, pet[key])
            }
        })

        const data = await api.patch(`pets/${pet._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,

                //É necessário pq o formulário contém imagens
                'Content-Type': 'multipart/form-data'
            }
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
        <div className="addpet_header">
            <h1>Editando o pet: {pet.name}</h1>
            <p>Após concluir a edição os dados serão atualizados</p>
        </div>

        {pet.name && (
            <PetForm handleSubmit={updatePet} btnText="Atualizar" petData={pet} />
        )}
    </section>
  )
}

export default EditPet
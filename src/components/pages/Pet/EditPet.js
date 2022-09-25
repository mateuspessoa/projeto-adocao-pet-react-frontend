import api from "../../../utils/api"
import { useState, useEffect } from "react"
import './AddPet'
import PetForm from "../../form/PetForm"

import useFlashMessage from "../../../hooks/useFlashMessage"

const EditPet = () => {
  return (
    <section>
        <div className="addpet_header">
            <h1>Editando o pet: 'pet.name'</h1>
            <p>Após concluir a edição os dados serão atualizados</p>
        </div>
    </section>
  )
}

export default EditPet
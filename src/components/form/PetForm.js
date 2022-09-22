import { useState } from "react"

import Input from "./Input"

import './Form.css'
import Select from "./Select"

const PetForm = ({handleSubmit, petData, btnText}) => {

    const [pet, setPet] = useState(petData || {})
    const [preview, setPreview] = useState([])
    const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"]

    function onFileChange(e) {

    }

    function handleOnChange(e) {

    }

    function handleColor(e) {

    }

  return (
    <form className="form_container">
        <Input text="Imagens do Pet" type="file" name="images" handleOnChange={onFileChange} multiple={true} />

        <Input text="Nome do Pet" type="text" name="name" placeholder="Digite o nome" handleOnChange={handleOnChange} value={pet.name || ''}/>

        <Input text="Idade do Pet" type="text" name="age" placeholder="Digite a idade" handleOnChange={handleOnChange} value={pet.age || ''}/>

        <Input text="Peso do Pet" type="number" name="weight" placeholder="Digite o peso" handleOnChange={handleOnChange} value={pet.name || ''}/>

        <Select name="color" text="Selecione a cor" options={colors} handleOnChange={handleColor} value={pet.color || ''} />

        <input type="submit" value={btnText}/>
    </form>
  )
}

export default PetForm
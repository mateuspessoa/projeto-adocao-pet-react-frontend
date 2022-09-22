import api from '../../../utils/api'
import { useState, useEffect } from "react";

import "./Profile.css";
import "../../form/Form.css"
import Input from "../../form/Input";

//Contém a função para preencher os campos de edição do usuário
const Profile = () => {

    //Acesso aos dados do usuário 
    const [user, setUser] = useState({})

    //Pegar o token do usuário logado para se comunicar com a API
    const [token] = useState(localStorage.getItem('token') || '')

    //Preecher os campos assim que a página é renderizada
    useEffect(() => {

      //Envia o token para receber os dados
      api.get('/users/checkuser', {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`
        }
      }).then((response) => {
        setUser(response.data)
      })

    }, [token])

  function onFileChange(e) {

  }
  
  function handleOnChange(e) {

  }

  return (
    <section>
        <div className="profile_header">
            <h1>Perfil</h1>
            <p>Preview de Imagem</p>
        </div>

        <form className="form_container">
            <Input text="Imagem" type="file" name="image" handleOnChange={onFileChange} />
            <Input text="Email" type="email" name="email" placeholder="Digite o seu email" handleOnChange={handleOnChange} value={user.email || ''} />

            <Input text="Nome" type="text" name="name" placeholder="Digite o seu nome" handleOnChange={handleOnChange} value={user.name || ''} />

            <Input text="Telefone" type="text" name="phone" placeholder="Digite o seu telefone" handleOnChange={handleOnChange} value={user.phone || ''} />

            <Input text="Senha" type="password" name="password" placeholder="Digite a sua senha" handleOnChange={handleOnChange} />

            <Input text="Confirmação da Senha" type="password" name="confirmpassword" placeholder="Confirme a sua senha" handleOnChange={handleOnChange} />

            <input type="submit" value="Editar" />
        </form>
    </section>
  )
}

export default Profile
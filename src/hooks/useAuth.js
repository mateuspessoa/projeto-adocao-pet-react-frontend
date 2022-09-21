import api from "../utils/api";
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'



export default function useAuth() {

    //Destruturando o setFlashMessage que vem do Hook para que o evento seja disparado
    const { setFlashMessage } = useFlashMessage()

    //Hooke para registro de usuário
    async function register(user) {

        //Mensagens que serão exibidas
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success' 

        try {

            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            console.log(data)

        } catch(error) {
            //Tratamento de erros

            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    return { register }

}

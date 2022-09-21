import api from "../utils/api";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import useFlashMessage from './useFlashMessage'



export default function useAuth() {

    //Estado que vai dizer se o usuário está autenticado ou não
    const [authenticated, setAuthenticated] = useState(false)

    //Destruturando o setFlashMessage que vem do Hook para que o evento seja disparado
    const { setFlashMessage } = useFlashMessage()

    //Serve para mudar a página do usuário após o cadastro
    const navigate = useNavigate()

    //Inserir o token na API automaticamente e verificar sem precisar ficar inserindo toda hora
    useEffect(() => {

        const token =localStorage.getItem('token')

        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            setAuthenticated(true)
        }

    }, [])

    //Hooke para registro de usuário
    async function register(user) {

        //Mensagens que serão exibidas
        let msgText = 'Cadastro realizado com sucesso!'
        let msgType = 'success' 

        try {

            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })

            await authUser(data)

        } catch(error) {
            //Tratamento de erros

            msgText = error.response.data.message
            msgType = 'error'
        }

        setFlashMessage(msgText, msgType)
    }

    //Função para receber os dados do usuário cadastrado
    async function authUser(data) {

        //Diz que o usuário está logado
        setAuthenticated(true)

        //Captura o token do usuário e salva no localstorage
        localStorage.setItem('token', JSON.stringify(data.token))

        //Redericiona para a pagina Home
        navigate('/')

    }

    //Função de Login
    async function login(user) {
        let msgText = 'Login realizado com sucesso'
        let msgType = 'success'

        try {

            const data = await api.post('/users/login', user).then((response) => {
                return response.data
            })

            await authUser(data)

        } catch(error) {

            msgText = error.response.data.message
            msgType = 'error'

        }

        setFlashMessage(msgText, msgType)
    }

    //Função para deslogar o usuário
    function logout() {
        const msgText = 'Usuário saiu'
        const msgType = 'success'

        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization = undefined
        navigate('/')

        setFlashMessage(msgText, msgType)
    }

    return { authenticated, register, logout, login }

}

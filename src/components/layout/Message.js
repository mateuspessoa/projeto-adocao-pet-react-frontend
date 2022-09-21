import styles from "./Message.module.css";
import { useState, useEffect } from "react";
import bus from "../../utils/bus";

const Message = () => {

    const [visibility, setVisibility] = useState(false)
    const [message, setMessage] = useState("")
    const [type, setType] = useState("")

    //A tela só irá re-renderizar quando o evento acontecer
    useEffect(() => {

        bus.addListener('flash', ({message, type}) => {

            setVisibility(true)
            setMessage(message)
            setType(type)

            //Serve para a mensagem desaparecer após alguns segundos
            setTimeout(() => {
                setVisibility(false)
            }, 3000)

        })

    }, [])

  return (
    visibility && (
        <div className={`${styles.message} ${styles[type]}`}>{message}</div>
    )
  )
}

export default Message
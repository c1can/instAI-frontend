import { useAuth } from "../auth"
import { useState } from "react"

export function useSettings() {


    const { updateEmail, updateName, updateUsername } = useAuth()

    const [ info, setInfo ] = useState({
        username: '',
        name: '',
        email: ''
    })


    const handleChange = e => {
        setInfo({...info, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        const {  username, name, email } = info

        switch(e.target.id) {
            case 'email': {
                updateEmail(email)
                break;
            }
            case 'name': {
                updateName(name)
                break;
            }
            case 'username': {
                updateUsername(username)
                break;
            }
        }

    }


    return { handleSubmit, handleChange }
}
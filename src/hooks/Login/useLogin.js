import { useState } from "react"
import { useLocation } from "wouter"
import { useAuth } from "../auth"
import { toast } from "wc-toast"

export function useLogin() {

    const userTemplate = {
        email: '',
        password: ''
    }

    const { signInWithEmail, signInWithGithub } = useAuth()
    const [ userData, setData] = useState(userTemplate)
    const [ , setPath ] = useLocation()


    const handleSubmit = async(e) => {
        e.preventDefault()
        const { email, password } = userData

        if(email == '' || password == '') return toast.error('Fill in all the inputs', {
            theme: {
                type: 'dark'
            }
        })

        setData(userTemplate)

        const error = await signInWithEmail(email, password)

        if(error) return toast.error(error, {
            theme: {
                type: 'dark'
            }
        })

        setPath("/")
    }


    return { signInWithGithub, userData, setData, handleSubmit}
}
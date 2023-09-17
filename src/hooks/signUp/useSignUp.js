import { useState } from "react";
import { toast } from "wc-toast";
import { useLocation } from "wouter";
import { useAuth } from "../auth";

export function useSignUp() {

    const { signUpWithEmail } = useAuth()

    const [data, setData] = useState({
        email: '',
        password: '',
        username: '',
        name: ''
    })

    const [, setPath] = useLocation()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const { email, password, name, username } = data

        if(email == '' || password == '' || name == '' || username == '') {
            return toast.error('Fill in all the fields!', {
                theme: {
                    type: 'dark'
                }
            })
        }

        const error = await signUpWithEmail(email, password, name, username)
        if(error) return toast.error(error, {
            theme: {
                type: 'dark'
            }
        })
        setPath("/")
    }

    return { handleSubmit, data, setData}

}
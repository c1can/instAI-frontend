import { useState, useEffect } from "react"
import { toast } from "wc-toast"
import { useAuth } from "./auth"

export const useCreate = () => {

    const { user } = useAuth()
    const [input, setInput] = useState({
        prompt: '',
        user: '',
        image: ''
    })


    const [loading, setLoading] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()

        if(loading) return
        if(user['session'] == null) return toast.error('Please sign up or login!', {theme: {type: 'dark'}}) //change this
        if(input.prompt == '') return toast.error('Please fill the input!', {theme: {type: 'dark'}})

        setInput({
            ...input,
            image: ''
        })

        setLoading(true)

        const { session } = user
        const email = session.user.email

        fetch(`${import.meta.env.VITE_API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({prompt: input.prompt}),
        })
        .then(response => response.json())
        .then(data => { 
            setLoading(false)
            if(data.error) {
                return toast.error('something went wrong! try with another input', {
                    theme: {
                        type: 'dark'
                    }
                })
            }
            setInput({
                ...input,
                user: email,
                image: `data:image/jpeg;base64,${data.image}`
            })
        })
        .catch(error => console.log(error))
    }


    return {input, setInput, loading, handleSubmit}
}
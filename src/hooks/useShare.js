import { useState } from "react"
import { toast } from "wc-toast"

export const useShare = (input) => {
    const [shareLoading, setShareLoading] = useState(false)
    
    const handleShare = e => {
        e.preventDefault()

        setShareLoading(true)
        fetch(`${import.meta.env.VITE_API_URL}/community/share`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        })
        .then(result => {
            setShareLoading(false)
            result.error
            ? toast.error('sorry, something went wrong')
            : toast.success('you have created a post!')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return { shareLoading, handleShare }
}
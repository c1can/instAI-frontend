import { useState } from "react"
import { toast } from "wc-toast"
import { useAuth } from "../../hooks/auth"
import { Header } from "../Home/Header"

export function Create() {

    const { user } = useAuth()

    const [input, setInput] = useState({
        prompt: '',
        user: '',
        image: ''
    })
    
    const [loading, setLoading] = useState(false)
    const [shareLoading, setShareLoading] = useState(false)

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

    const handleShare = (e) => {
        e.preventDefault()

        setShareLoading(true)
        fetch(`${import.meta.env.VITE_API_URL}/community-share`, {
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
            : toast.success('you have succesfully created a post!')
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <>
            <Header create="false"/>
            <main className="pt-10">
                <div className="container m-auto">
                    <h1 className="text-2xl font-semibold">Create</h1>
                    <p className="mt-4 text-lg">Create everything you can imagine with the help of Dall-e OpenIA API</p>

                    <form className="pt-10 max-w-[800px]" onSubmit={e => handleSubmit(e)}>
                        <label htmlFor="prompt">Your Prompt</label>
                        <input type="text" id="prompt" name='prompt' className="block p-2 border border-gray-400 rounded-lg outline-none mt-2 w-full" placeholder="an amazing landscape" onChange={e => setInput({...input, [e.target.name]: e.target.value})}/>

                        {
                            input.image !== ''
                            ? 
                                <div className="image max-w-[500px] my-10">
                                    {
                                        loading 
                                        ?
                                        <div className="flex justify-center">
                                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role='status'>
                                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                            </div>
                                        </div>
                                        :
                                       <img src={input.image} alt="generatedImage" />
                                    }
                                </div>
                            : 
                            <div className="preview mt-4">
                                {
                                    loading 
                                    ? 
                                        <div className="flex justify-center py-20">
                                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role='status'>
                                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
                                            </div>
                                        </div>
                                    : 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="244" height="244" viewBox="0 0 24 24"><path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/></svg>
                                }
                            </div>

                        }
                        <div className={`${input.image !== '' ? 'flex flex-col gap-4 md:flex-row md:items-center' : ''}`}>
                           <input type="submit" value={loading ? 'Generating...' : 'Generate!'} className={`${loading ? 'bg-gray-500 border-none' : 'bg-black'} border border-black text-white py-4 px-8 rounded-md hover:bg-white hover:text-black cursor-pointer`}/>
                            {

                                 input.image !== '' && <input type='button' onClick={(e) => handleShare(e)} className="py-4 px-8 rounded-md hover:bg-gray-500 hover:text-white border border-black hover:border-none cursor-pointer" value={shareLoading ? 'Sharing...' : 'Share with Community'}></input>
                            } 
                        </div>
                    </form>
                </div>

                
            </main>
        </>
    )
}
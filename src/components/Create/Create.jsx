import { useState } from "react"
import { toast } from "wc-toast"
import { useAuth } from "../../hooks/auth"
import { Header } from "../Home/Header"

export function Create() {

    const [ result, setResult ] = useState(null)
    const { user } = useAuth()
    const [input, setInput] = useState({
        prompt: ''
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        if(input.prompt == '') return toast.error('Please fill the input!', {theme: {type: 'dark'}})
        if(user['session'] == null) return toast.error('Please sign up or login!', {theme: {type: 'dark'}})
    }
    const handdleChange = e => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <Header create="false"/>
            <main className="pt-10">
                <div className="container m-auto">
                    <h1 className="text-2xl font-semibold">Create</h1>
                    <p className="mt-4 text-lg">Create everything you can imagine with the help of Dall-e OpenIA API</p>

                    <form className="pt-10" onSubmit={e => handleSubmit(e)}>
                        <label htmlFor="prompt">Your Prompt</label>
                        <input type="text" id="prompt" name='prompt' className="block p-2 border border-gray-400 rounded-lg outline-none mt-2 sm:w-[600px]" placeholder="an amazing landscape" onChange={e => handdleChange(e)}/>

                        {
                            result 
                            ? 
                                <img src={result} alt="preview" />
                            : 
                            <div className="preview mt-4">
                                <svg xmlns="http://www.w3.org/2000/svg" width="244" height="244" viewBox="0 0 24 24"><path d="M14 9l-2.519 4-2.481-1.96-5 6.96h16l-6-9zm8-5v16h-20v-16h20zm2-2h-24v20h24v-20zm-20 6c0-1.104.896-2 2-2s2 .896 2 2c0 1.105-.896 2-2 2s-2-.895-2-2z"/></svg>
                            </div>

                        }
                        <input type="submit" value="Generate!" className="bg-black text-white mt-4 py-4 px-8 rounded-md hover:bg-white hover:text-black cursor-pointer hover:border hover:border-black"/>
                        {
                            result && <button>Share with community</button>
                        }
                    </form>
                </div>

                
            </main>
        </>
    )
}
import { useState } from "react"
import { toast } from "wc-toast"
import { Link, useLocation } from "wouter"
import { useAuth } from "../hooks/auth"

export function SignUp() {

    const { signInWithGithub, signUpWithEmail } = useAuth()
    const [data, setData] = useState({
        email: '',
        password: '',
        name: '',
        lastName: ''
    })
    const [, setPath] = useLocation()

    const handleSubmit = async(e) => {
        e.preventDefault()
        const { email, password, name, lastName } = data

        if(email == '' || password == '' || name == '' || lastName == '') {
            return toast.error('Fill in all the fields!', {
                theme: {
                    type: 'dark'
                }
            })
        }

        const error = await signUpWithEmail(email, password, name, lastName)
        if(error) return toast.error(error, {
            theme: {
                type: 'dark'
            }
        })
        setPath("/")
    }

    return (
        <main className="h-screen">
            <div className="container m-auto h-full grid place-items-center">
                <div className="mainCard">
                  <h1 className="text-4xl font-semibold text-center mb-10">Join to our social <br />med<span className="text-5xl">IA</span></h1>


                    <form onSubmit={handleSubmit}>
                            <div className="names flex flex-col gap-2 mb-4 sm:flex-row">
                                <div className="name">
                                    <label htmlFor="name" className="text-xl text-gray-700">Name</label>
                                    <input type="text" name='name' id="name" className="block p-2 rounded-lg border border-gray-400 outline-none w-full" onChange={e => setData({...data, [e.target.name]: e.target.value})}/>
                                </div>
                                <div className="lastName">
                                    <label htmlFor="lastName" className="text-xl text-gray-700">Last Name</label>
                                    <input type="text" name="lastName" id="lastName" className="block border border-gray-400 p-2 rounded-lg outline-none w-full" onChange={e => setData({...data, [e.target.name]: e.target.value})}/>
                                </div>
                            </div>
                            <label htmlFor="email" className="text-xl text-gray-700">Email</label>
                            <input type="email" name="email" id="email" className="block p-2 rounded-lg border border-gray-400 outline-none w-full mb-4" onChange={e => setData({...data, [e.target.name]: e.target.value})}/>
                            <label htmlFor="password" className="text-xl text-gray-700">Password</label>
                            <input type="password" name="password" id="password" className="block p-2 rounded-lg border border-gray-400 outline-none w-full" onChange={e => setData({...data, [e.target.name]: e.target.value})}/>

                            <input type="submit" value="Submit" className="py-2 px-6 border bg-black border-black text-white my-4 rounded-lg cursor-pointer hover:bg-white hover:text-black"/>
                    </form>
                    
                    <p className="text-center my-4 border-b border-gray-400 pb-2 font-mono">Or</p>

                    <div className="providers flex flex-col gap-4 mb-4 md:flex-row md:gap-2 md:justify-center">
                        <button onClick={signInWithGithub} type="button" className="text-white bg-[#24292F] hover:bg-[#24292F]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-5 py-4 text-center inline-flex items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30">
                            <svg className="w-4 h-4 mr-2 -ml-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="github" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="currentColor" d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"></path></svg>
                                Continue with Github
                        </button>
                    </div>
                    <div className="already flex gap-2 justify-center border-t border-gray-300 pt-2">
                        <p>already have an account?</p>
                        <Link to="/login">
                            <a className="text-gray-600 hover:text-blue-500">Log in</a>
                        </Link>
                    </div>
                </div>
            </div>
        </main>
    )
}
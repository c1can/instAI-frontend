import { createClient } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { getStorage } from "../utils/getLocalStorage";

export const Auth = createContext({})

export function AuthContextProvider({children}) {

    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

    const [user, setUser] = useState(getStorage()) 


    //try to fix this
    useEffect(() => {
        getUser()
    }, [])

    //try to fix this
    const getUser = async() => {
        const { data, error } = await supabase.auth.getSession()

        if(error) console.log(error)
        setUser(data) //this actions innecesary repeats
        window.localStorage.setItem('currentUser', JSON.stringify(data))
    }

    const signUpWithEmail = async(email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password
        })

        if(error) return error
        setUser(data) 
        window.localStorage.setItem('currentUser', JSON.stringify(data))
    }

    const signInWithEmail = async(email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if(error) return error.message
        setUser(data)
        window.localStorage.setItem('currentUser', JSON.stringify(data))
    }

    const signInWithGithub = async() => {
        try {
            await supabase.auth.signInWithOAuth({
                provider: 'github'
            })
        } catch (error) {
            console.log(error)   
        }
    }

    const signOut = async() => {
        const { error } = await supabase.auth.signOut()
        if(error) return console.log(error)

        window.localStorage.clear('currentUser')
        window.location.reload(true)
    } 

    return (
        <Auth.Provider value={ { signInWithGithub, signUpWithEmail, signInWithEmail, signOut, user } }>
            {children}
        </Auth.Provider>
    )
}
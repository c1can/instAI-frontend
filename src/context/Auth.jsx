
import { createClient } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";

export const Auth = createContext({})

export function AuthContextProvider({children}) {

    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

    const [user, setUser] = useState(null)

    const getUserSession = async () => {
        const { data, error } = await supabase.auth.getSession()
        
        return error ? console.log(error) : setUser(data)
    }

    useEffect(() => {
        console.log('change')
        getUserSession()     
    }, [])

    const signUpWithEmail = async(name, lastName, email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    name: name,
                    lastName: lastName
                }
            }
        })

        if(error) return error
        setUser(data)
    }
    const signInWithEmail = async(email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if(error) return error.message
        setUser(data)
    }

    const signInWithGithub = async() => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
                redirectTo: 'http://localhost:5173/'
            }
        })
        if(error) console.log('error', error)
        setUser(data)
    }

    const signOut = async() => {
        const { error } = await supabase.auth.signOut()

        if(error) console.log(error)
    } 

    return (
        <Auth.Provider value={ { signInWithGithub, signUpWithEmail, signInWithEmail, signOut, user } }>
            {children}
        </Auth.Provider>
    )
}
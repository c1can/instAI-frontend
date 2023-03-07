import { createClient } from "@supabase/supabase-js";
import { createContext } from "react";

export const Auth = createContext({})

export function AuthContextProvider({children}) {

    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

    const signInWithGithub = async() => {
        const { user, error } = await supabase.auth.signInWithOAuth({
            provider: 'github'
        })
        if(error) console.log('error', error)
    }

    const signInWithGmail = async() => {
        const { user, error } = await supabase.auth.signInWithOAuth({
            provider: 'google'
        })

        error && console.log('error', error)
    }

    return (
        <Auth.Provider value={ { signInWithGithub, signInWithGmail } }>
            {children}
        </Auth.Provider>
    )
}
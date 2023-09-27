import { createClient } from "@supabase/supabase-js";
import { createContext, useEffect, useState } from "react";
import { getStorage } from "../utils/getLocalStorage";
import { toast } from "wc-toast";
import { ediPosts } from "../services/editPosts";

export const Auth = createContext({})

export function AuthContextProvider({children}) {

    const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_KEY)

    const [user, setUser] = useState(getStorage()) 

    useEffect(() => {
        getUser()
    }, [])

    const getUser = async() => {
        const { data, error } = await supabase.auth.getSession()

        if(error) console.log(error)
        setUser(data) //this actions innecesary repeats or maybe not
        window.localStorage.setItem('currentUser', JSON.stringify(data))
    }

    const signUpWithEmail = async(email, password, name, username) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    full_name: name,
                    user_name: username
                }
            }
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

    const signInWithGithub = async() => { //al parecer esto hace un reload automatico por eso tuve que hacer el useEffect
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

   const updateEmail = async(newEmail) => {
        const { error } = await supabase.auth.updateUser({email: newEmail})
        
        return error 
        ? toast.error('Something weng wrong')
        : toast.success(`we've sent a confirmation to your new email!`, {
            duration: 4000,
            closeable: true
        })
   }

   const updateName = async(newFullName) => {
        const { data, error } = await supabase.auth.updateUser({
            data: {full_name: newFullName}
        })
        error
         ? 
         toast.error('something went wrong')
         :
         setUser({session: {
            user: data.user
         }})
         window.localStorage.setItem('currentUser', JSON.stringify({session: {user: data.user}}))
         toast.success('user updated!')
   }

   const updateUsername = async(actualUsername, newUsername) => {
        const { data, error } = await supabase.auth.updateUser({
            data: {user_name: newUsername}
        })
        error
        ? 
        toast.error('something went wrong') 
        :
        await ediPosts(actualUsername, newUsername)
        
        setUser({session: {
            user: data.user
        }})
        window.localStorage.setItem('currentUser', JSON.stringify({session: {user: data.user}}))
        toast.success('username updated!')
   }

    return (
        <Auth.Provider value={ 
            { 
                signInWithGithub, 
                signUpWithEmail, 
                signInWithEmail, 
                signOut, 
                updateEmail,
                updateName,
                updateUsername,
                user 
            } }>
            {children}
        </Auth.Provider>
    )
}
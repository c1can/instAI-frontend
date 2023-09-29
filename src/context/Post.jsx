import { createContext, useEffect, useState } from "react";
import { getPosts } from "../services/getPosts";

export const PostContext = createContext()

export function PostContextProvider({children}) {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        getPosts()
            .then(data => {
               return data
                ? setPosts(data)
                : setPosts({error: 'error de conexion'})
            })
    }, [])

    return (
        <PostContext.Provider value={ { posts }}>
            {
                children
            }
        </PostContext.Provider>
    )
}
import { useEffect, useState } from "react";
import { getPosts } from "../services/getPosts";

export function usePosts() {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        getPosts()
            .then(data => {
                data ? setPosts(data) : setPosts({error: 'Hubo un error de conexión a la API'})
            })
    }, [])

    return { posts }
}
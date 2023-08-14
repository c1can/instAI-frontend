import { useEffect, useState } from "react";
import { getPosts } from "../services/getPosts";

export function usePosts() {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        getPosts()
            .then(data => {
                return data
                ? setPosts(data)
                : setPosts({ error: 'Error de conexion' })
            })
    }, [])

    return { posts }
}
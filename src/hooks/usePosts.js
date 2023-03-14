import { useEffect, useState } from "react";
import { getPosts } from "../services/getPosts";

export function usePosts() {
    const [ posts, setPosts ] = useState([])

    useEffect(() => {
        getPosts()
            .then(data => setPosts(data))
    }, [])

    return { posts }
}
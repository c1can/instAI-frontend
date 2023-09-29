import { useContext } from "react";
import { PostContext } from "../context/Post";

export function usePosts() {
    const {posts} = useContext(PostContext)


    return { posts }
}
import { useEffect, useState } from "react"
import { Header } from "./Header"

export function Home() {

    
    const [posts, setPosts] = useState([])

    return (
        <>
            <Header />

            <main className="pt-10">
                <div className="container m-auto">
                    <h1 className="text-2xl font-semibold">Community Posts</h1>

                    {
                        posts.length > 0
                        ? 
                        <div className="grid">
                            {
                                posts.map(post => (
                                    <div className="image">
                                        <p>{post.title}</p>
                                    </div>
                                ))
                            }
                        </div>
                        :
                        <p>Users haven't post</p>
                    }
                </div>
            </main>
        </>
        
    )
}
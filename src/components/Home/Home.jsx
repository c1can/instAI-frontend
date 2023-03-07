import { useEffect, useState } from "react"
import { Link } from "wouter"
import { Header } from "./Header"

export function Home() {

    
    const [posts, setPosts] = useState([])

    return (
        <>
            <Header />

            <main className="pt-10">
                <div className="container m-auto">
                    <div className="headerMain mb-8 flex justify-between items-center">
                       <h1 className="text-2xl font-semibold">Community Posts</h1>
                        <Link to="/create">
                            <a className="bg-black text-white py-2 px-8 rounded-lg">Create</a>
                        </Link>
                    </div>

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
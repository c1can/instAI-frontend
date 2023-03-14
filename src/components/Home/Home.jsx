import { useEffect, useState } from "react"
import { Link } from "wouter"
import { Header } from "./Header"

export function Home() {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/community`)
            .then(data => data.json())
            .then(result => setPosts(result))
    }, [])

    return (
        <>
            <Header />

            <main className="pt-10">
                <div className="container m-auto">
                    <div className="headerMain mb-8 flex justify-between items-center">
                       <h1 className="text-2xl font-semibold">Community Posts</h1>
                        <Link to="/create">
                            <a className="bg-black border border-black text-white py-2 px-8 rounded-lg hover:bg-white hover:text-black">Create</a>
                        </Link>
                    </div>

                    {
                        posts.length > 0
                        ? 
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                            {
                                posts.map(({ user, prompt, image, _id }) => (
                                    <div className="Card" key={_id}>
                                        <img src={image} alt={prompt} />
                                        <div className="info px-2 py-4 flex flex-col gap-4 bg-black opacity-90">
                                            <p className="text-gray-4000"><span className="font-bold text-white">Prompt: </span>{prompt}</p>
                                            <p className="text-gray-400"><span className="font-bold text-white">Created by: </span>{user}</p>
                                        </div>
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
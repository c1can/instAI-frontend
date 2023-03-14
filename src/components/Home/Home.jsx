import { Link } from "wouter"
import { usePosts } from "../../hooks/usePosts"
import { Header } from "./Header"
import Card from "./Card"

export function Home() {
    const { posts } = usePosts()

    return (
        <>
            <Header />
            <main className="py-10">
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
                                posts.map(post => 
                                    <Card {...post} key={post._id}/>
                                )
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
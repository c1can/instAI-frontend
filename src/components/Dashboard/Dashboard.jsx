import { useMetadata } from "../../hooks/useMetadata";
import { usePosts } from "../../hooks/usePosts";
import { Card } from "../Home/Card";
import { Header } from "../Home/Header";

export function Dashboard() {
    const { posts } = usePosts()
    const { username } = useMetadata()
    const myPosts = posts.filter(({user}) => user == username)

    return (
        <>
            <Header />

            <main className="container m-auto pb-10">
               <h1 className="text-3xl font-bold pt-10">Dashboard</h1>
               <p className="text-gray-500 pt-1 pb-10">Here you can find all the creations you have shared!</p>


               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {
                    myPosts.map(post => (
                        <Card {...post} main={false} key={post._id}/>
                    ))
                }
               </div>
            </main>
        </>
    )
}
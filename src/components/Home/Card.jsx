import { HeartIcon } from "../utils/HeartIcon"

export function Card({ user, prompt, image, avatar, main=true }) {

    return (
        <div className="Card">
            <img src={image} alt={prompt} />
            <div className="info p-6 flex flex-col gap-4 bg-black opacity-90 rounded-b-md">
                <p className="text-gray-400"><span className="font-bold text-white">Prompt: </span>{prompt}</p>
                {
                   main && (
                    <>
                       <div className="user_data flex items-center justify-between">
                        <p className="text-gray-400"><span className="font-bold text-white">Shared by: </span>{user}</p>
                    <div style={{backgroundImage: `${avatar ? `url(${avatar})` : null}`}} className={`avatar border border-gray-100 h-[35px] w-[35px] border-opacity-50 rounded-full ${avatar ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}`}></div>
                    </div> 

                        <HeartIcon />
                    </>
                   )
                }
            </div>
        </div>
    )
}

//different way to prevent modifying the component, OPEN AND CLOSE Principle

export function CardOCP({image, prompt, user, children}) {
    return (
        <div className="card">
            <img src={image} alt={prompt} />
            <div className="info p-6 flex flex-col gap-4 bg-black opacity-90 rounded-b-md">
                <p className="text-gray-400">
                    <span className="font-bold text-white">Share by: </span>
                    {user}
                </p>

                {
                    children
                }
            </div>
        </div>
    )
}
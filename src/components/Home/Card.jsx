function Card({ user, prompt, image, _id }) {
    return (
        <div className="Card" key={_id}>
            <img src={image} alt={prompt} />
            <div className="info px-2 py-4 flex flex-col gap-4 bg-black opacity-90">
                <p className="text-gray-400"><span className="font-bold text-white">Prompt: </span>{prompt}</p>
                <p className="text-gray-400"><span className="font-bold text-white">Created by: </span>{user}</p>
             </div>
        </div>
    )
}

export default Card
function Card({ user, prompt, image, _id, avatar }) {
    return (
        <div className="Card" key={_id}>
            <img src={image} alt={prompt} />
            <div className="info p-6 flex flex-col gap-4 bg-black opacity-90 rounded-sm">
                <p className="text-gray-400"><span className="font-bold text-white">Prompt: </span>{prompt}</p>
                <div className="user_data flex items-center justify-between">
                   <p className="text-gray-400"><span className="font-bold text-white">Shared by: </span>{user}</p>
                    <div style={{backgroundImage: `${avatar ? `url(${avatar})` : null}`}} className={`avatar border border-gray-100 h-[35px] w-[35px] border-opacity-50 rounded-full ${avatar ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}`}></div>
                    </div>
                </div>
        </div>
    )
}

export default Card
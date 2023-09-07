import { useEffect, useState } from "react"
import { Link } from "wouter"
import { useAuth } from "../../hooks/auth"


export function Header() {

    const { user, signOut } = useAuth()
    const [active, setActive] = useState(false)

    return (
        <header className="shadow-md h-[70px]">
                <div className="container m-auto h-full flex items-center justify-between">
                    <div className="flex gap-1 items-center">
                    <Link href="/" className="text-xl text-black">
                        Inst<span className="text-2xl font-bold">AI</span>
                    </Link>
                    <div className="logo h-7 w-7">
                        <svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="m11.6 11c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v9c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-2.092 0-6.908 0-9zm9.4 6c0-.552-.448-1-1-1h-6c-.538 0-1 .477-1 1v3c0 .552.448 1 1 1h6c.552 0 1-.448 1-1zm0-13c0-.552-.448-1-1-1-1.537 0-4.463 0-6 0-.552 0-1 .448-1 1v9.6c0 .552.448 1 1 1h6c.552 0 1-.448 1-1 0-2.194 0-7.406 0-9.6zm-9.4 0c0-.552-.448-1-1-1-1.655 0-4.945 0-6.6 0-.552 0-1 .448-1 1v3.6c0 .552.448 1 1 1h6.6c.552 0 1-.448 1-1 0-1.017 0-2.583 0-3.6z" fillRule="nonzero"/></svg>
                    </div>
                    </div>

                    {
                    user['session'] == null
                    ? 
                        <nav className="register flex gap-4 items-center">
                            <Link to="/login">
                                <a className="register text-gray-500 hover:text-black transition-all">
                                    Login
                                </a>
                            </Link>
                            <Link to="/signup">
                                <a className="register text-white bg-black border border-black py-1 px-4 rounded-lg hover:bg-white hover:text-black">
                                    Sign Up
                                </a>
                            </Link>
                        </nav> 
                    :
                        <div className="navegation flex gap-1 items-center relative">
                                    <button style={{backgroundImage: `${user.session.user.user_metadata.avatar_url ? `url(${user.session.user.user_metadata.avatar_url})` : null}`}} className={`avatar h-[40px] w-[40px] rounded-full ${user.session.user.user_metadata.avatar_url ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}`} onClick={() => setActive(!active)}></button>

                                    <div className={`z-100 bg-white absolute h-[350px] w-[250px] top-12 right-0 shadow-xl rounded-lg flex flex-col py-8 ${active ? 'block' : 'hidden'}`}>
                                        <p className="text-gray-600 border-b border-gray-300 text-center pb-2">{user.session.user.user_metadata.user_name || user.session.user.user_metadata.username}</p>

                                        <nav className="my-4">
                                            <ul className="flex flex-col gap-2">
                                                <li className="text-gray-600 pl-4 hover:gray-800 hover:bg-gray-100 transition-all">
                                                    <Link href="/settings" className="block py-2">
                                                        Profile Settings
                                                    </Link>
                                                </li>
                                                <li className="text-gray-600 pl-4 hover:gray-800 hover:bg-gray-100 py-2 transition-all">
                                                    <a href="#" className="block">Dashboard</a>
                                                </li>
                                                <li className="text-gray-600 pl-4 hover:gray-800 hover:bg-gray-100 py-2 transition-all">
                                                    <a href="#" className="block">Liked</a>
                                                </li>
                                                <li className="text-gray-600 pl-4 hover:gray-800 hover:bg-gray-100 py-2 transition-all">
                                                    <p>Theme</p>
                                                </li>
                                            </ul>
                                        </nav>

                                        <button className="bg-black py-2 self-center px-10 rounded-md hover:bg-white hover:text-black hover:border hover:border-black transition-all text-white" onClick={signOut}>Logout</button>
                                    </div>
                        </div>
                    }
                </div>
            </header>
    )
}
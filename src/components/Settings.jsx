import { useState } from "react";
import { useAuth } from "../hooks/auth";
import { Header } from "./Home/Header";

export function Settings() {

    const { user, updateEmail, updateName, updateUsername } = useAuth()

    const metadata = user.session.user.user_metadata

    const userAvatar = metadata.avatar_url
    const username = metadata.user_name
    const fullName = metadata.full_name
    const userEmail = user.session.user.email

    const [info, setInfo] = useState({
        username: '',
        name: '',
        email: ''
    })
    const handleChange = e => {
        setInfo({...info, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()

        const {  username, name, email } = info

        switch(e.target.id) {
            case 'email': {
                updateEmail(email)
                break;
            }
            case 'name': {
                updateName(name)
                break;
            }
            case 'username': {
                updateUsername(username)
                break;
            }
        }

    }

    return (
        <>
            <Header />
            <main>
                <div className="container m-auto">
                    <h1 className="font-bold text-3xl py-10">Personal Account Settings</h1>
                    <div className="settings-dashboard w-full px-4 rounded-md pb-4">
                        <h2 className="font-semibold text-xl bg-slate-300 inline p-2 rounded-md">My Profile</h2>



                        <div className="flex flex-col items-center sm:flex-row sm:items-start sm:gap-10">

                            <div className="Avatar mt-8">
                                {
                                    userAvatar == null
                                    ? 
                                      <div className="random h-[150px] w-[150px] rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                                    :
                                      <img src={userAvatar} alt="avatar" width='150px' height='150px' className="rounded-full"/>
                                }
                            </div>

                            <section id="userSections" className="flex-1 flex flex-col gap-6 my-10">
                                <div className="username border border-gray-400 p-3 rounded-md">
                                    <form id="username" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                        <h2 className="text-xl font-bold">Your Username</h2>
                                        <input name="username" type="text" defaultValue={username} className="p-2 border border-gray-300" onChange={handleChange}/>
                                        <div className="submitBtn flex justify-end">
                                            <input type="submit" value="Save" className="bg-black text-white py-1 px-4 rounded-md cursor-pointer"/>
                                        </div>
                                    </form>
                                </div>
                                <div className="fullName flex flex-col gap-2 border border-gray-400 p-3 rounded-md">
                                    <form id="name" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                        <h2 className="text-xl font-bold">Your Name</h2>
                                        <input name="name" type="text" defaultValue={fullName} className="p-2 border border-gray-300" onChange={handleChange}/>
                                        <div className="submitBtn flex justify-end">
                                            <input type="submit" value="Save" className="bg-black text-white py-1 px-4 rounded-md cursor-pointer"/>
                                        </div>
                                    </form>
                                </div>
                                <div className="email border border-gray-400 p-3 rounded-md">
                                    <form id="email" className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                        <h2 className="text-xl font-bold">Your Email</h2>
                                        <input name="email" type="text" defaultValue={userEmail} className="p-2 border border-gray-300" onChange={handleChange}/>
                                        <div className="submitBtn flex justify-between border-t border-gray-300 items-center pt-1">
                                            <p className="text-sm opacity-70">A confirmation request will be send to your new email</p>
                                            <input type="submit" value="Save" className="bg-black text-white py-1 px-4 rounded-md cursor-pointer"/>
                                        </div>
                                    </form>
                                </div>
                            </section>
                            
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
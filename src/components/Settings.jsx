import { useAuth } from "../hooks/auth";
import { Header } from "./Home/Header";

export function Settings() {

    const { user } = useAuth()

    const metadata = user.session.user.user_metadata

    const userAvatar = metadata.avatar_url
    const userName = metadata.full_name
    const userEmail = user.session.user.email

    //gmail
    const name = metadata.firstName
    const lastName = metadata.lastName

    return (
        <>
            <Header />
            <main>
                <div className="container m-auto">
                    <h1 className="font-bold text-3xl py-10">Account Settings</h1>
                    <div className="settings-dashboard w-full border border-red-500 px-4">
                        <h2 className="font-semibold text-xl bg-slate-200 inline p-2 rounded-md">My Profile</h2>



                        <div className="flex flex-col sm:flex-row items-center gap-10">
                            <div style={userAvatar && { backgroundImage: `url(${userAvatar})` }} className={`rounded-image h-[150px] w-[150px] rounded-full my-8 ${userAvatar ? "bg-no-repeat bg-center bg-cover": 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'}`}>
                            </div>
                            <div className="flex flex-col gap-2">
                                <h2 className="text-2xl font-bold">{userName || `${name} ${lastName}`}</h2>
                                <p className="text-md text-gray-500">{userEmail}</p>
                            </div>

                            <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
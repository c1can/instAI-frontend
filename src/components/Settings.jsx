import { useAuth } from "../hooks/auth";
import { Header } from "./Home/Header";

export function Settings() {

    const { user } = useAuth()
    const userAvatar = user.session.user.user_metadata.avatar_url

    return (
        <>
            <Header />
            <main>
                <div className="container m-auto">
                    <h1 className="font-bold text-3xl py-10">Account Settings</h1>
                    <div className="settings-dashboard w-full border border-red-500 px-4">
                        <h2 className="font-semibold text-xl bg-slate-200 inline p-2 rounded-md">My Profile</h2>


                        <div style={{backgroundImage: `${userAvatar ? `url(${userAvatar})` : null}`}} className={`rounded-image h-[150px] w-[150px] rounded-full my-8 ${userAvatar && "bg-no-repeat bg-center bg-cover"}`}>

                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}
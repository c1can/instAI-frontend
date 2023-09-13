import { useAuth } from "./auth";

export function useMetadata() {
    const { user } = useAuth()


    const metadata = user.session.user.user_metadata
    const userAvatar = metadata.avatar_url
    const username = metadata.user_name
    const fullName = metadata.full_name
    const userEmail = user.session.user.email

    return { userAvatar, username, fullName, userEmail } 
}
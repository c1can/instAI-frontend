import { useContext } from "react";
import { Auth } from "../context/Auth";

export function useAuth() {
    const { signInWithGithub, signUpWithEmail, signInWithEmail, user, signOut, updateEmail, updateName, updateUsername } = useContext(Auth)

    return { signInWithGithub, signUpWithEmail, user, signOut, signInWithEmail, updateEmail, updateName, updateUsername }
}
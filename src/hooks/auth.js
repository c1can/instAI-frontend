import { useContext } from "react";
import { Auth } from "../context/Auth";

export function useAuth() {
    const { signInWithGithub, signUpWithEmail, signInWithEmail, user, signOut } = useContext(Auth)

    return { signInWithGithub, signUpWithEmail, user, signOut, signInWithEmail }
}
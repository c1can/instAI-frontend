import { useContext } from "react";
import { Auth } from "../context/Auth";

export function useAuth() {
    const { signInWithGmail, signInWithGithub } = useContext(Auth)

    return { signInWithGithub, signInWithGmail }
}
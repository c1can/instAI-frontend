import { Redirect } from "wouter"
import { useAuth } from "../hooks/auth"

export function ProtectRoute({ children }) {
    
    const { user } = useAuth()

    return (
        user.session
        ? children 
        : <Redirect to="/"/>
    )
}
import { Route } from "wouter"
import { Home } from "../components/Home/Home"
import { Create } from "../components/Create/Create"
import { SignUp } from "../components/SignUp"
import { Login } from "../components/Login"
import { Settings } from "../components/Settings"
import { ProtectRoute } from "../components/ProtectRoute"
import { Dashboard } from "../components/Dashboard/Dashboard"

export function Routes() {

    return(
        <>
            <Route path="/" component={Home}></Route>
            <Route path="/signup" component={SignUp}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/create" component={Create}></Route>

            <Route path="/settings">{
                <ProtectRoute>
                    <Settings />
                </ProtectRoute>
            }</Route>

            <Route path="/dashboard"> 
                <ProtectRoute>
                    <Dashboard />
                </ProtectRoute>
            </Route>

        </>
    )
}
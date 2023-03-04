import { Route } from "wouter"
import { Home } from "../components/Home/Home"
import { Create } from "../components/Create/Create"
import { Register } from "../components/Register"
import { Login } from "../components/Login"

export function Routes() {

    return(
        <>
            <Route path="/" component={Home}></Route>
            <Route path="/register" component={Register}></Route>
            <Route path="/login" component={Login}></Route>
            <Route path="/create" component={Create}></Route>
        </>
    )
}
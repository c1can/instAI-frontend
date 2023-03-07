import { Routes } from "./routes/Routes"
import { AuthContextProvider } from "./context/Auth"

function App() {

  return (
    <>
    <wc-toast position="bottom-center"></wc-toast>

    <AuthContextProvider>
        <Routes />
    </AuthContextProvider>
    </>
  )
}

export default App

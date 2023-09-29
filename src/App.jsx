import { Routes } from "./routes/Routes"
import { AuthContextProvider } from "./context/Auth"
import { PostContextProvider } from "./context/Post"

function App() {

  return (
    <>
    <wc-toast position="bottom-center"></wc-toast>

    <AuthContextProvider>
      <PostContextProvider>
        <Routes />
      </PostContextProvider>
    </AuthContextProvider>
    </>
  )
}

export default App

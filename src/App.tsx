import "./App.css"
import { useSelector } from "react-redux"
import { AuthPage } from "./pages/auth"
import { MainPage } from "./pages/main"

function App() {
  // @ts-ignore
  const { isAuth } = useSelector(state => state.auth)
  console.log(isAuth);
   console.log("hello from mobile")
  return (
    <div className="App">
      {isAuth ? <MainPage /> : <AuthPage />}
    </div>
  )
}

export default App
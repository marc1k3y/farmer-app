import "./App.css"
import { AuthPage } from "./pages/auth"
import { MainPage } from "./pages/main"
import { useAppSelector } from "./hooks/redux"

function App() {
  const { isAuth } = useAppSelector(state => state.auth)

  return (
    <div className="App">
      {isAuth ? <MainPage /> : <AuthPage />}
    </div>
  )
}

export default App
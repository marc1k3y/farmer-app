import "./App.css"
import { AppSelector } from "./components/AppSelector"
import { AppRouter } from "./Router"

function App() {
  
  return (
    <div className="App">
      <AppSelector />
      <AppRouter />
    </div>
  )
}

export default App
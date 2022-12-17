import "./App.css"
import { CreateAccountRequestButton } from "./components/outTableActions/CreateAccountRequest"
import { PeriodSelector } from "./components/PeriodSelector"

function App() {
  return (
    <div className="App">
      {/* <PeriodSelector /> */}
      <CreateAccountRequestButton />
    </div>
  )
}

export default App
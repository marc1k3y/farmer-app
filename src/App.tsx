import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"
import "./App.css"
import { CreateAccountRequestButton } from "./components/outTableActions/CreateAccountRequest";
import { fetchTables } from "./redux/mainTablesSlice";

function App() {
  const dispatch = useDispatch()
  // @ts-ignore
  const { mainTables, loading, error } = useSelector(state => state.mainTables)
  console.log(mainTables, loading, error);
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchTables(0))
  }, [dispatch])

  return (
    <div className="App">
    </div>
  )
}

export default App

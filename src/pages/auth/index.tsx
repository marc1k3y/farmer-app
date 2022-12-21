import css from "./style.module.css"
// import logo from "../../assets/logo.png"
import { FormEvent, useEffect, useState } from "react"
import { Loader } from "../../components/UI/Loader"
import { checkAuth, tryAuth } from "../../http/authThunk"
import { useAppDispatch, useAppSelector } from "../../hooks/redux"
// import { ErrorWindow } from "../../components/UI/Error"

export const AuthPage = () => {
  const dispatch = useAppDispatch()
  const { loading, error } = useAppSelector(state => state.auth)
  const [authData, setAuthData] = useState({
    email: "",
    password: ""
  })

  function auth(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    dispatch(tryAuth(authData))
  }

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if (loading) return <Loader />
  if (error) console.log(error)
  return (
    <div className={css.wrapper}>
      {/* <div className={css.logo}>
        <img src={logo} alt="brand-logo" />
      </div> */}
      <form className={css.authForm} onSubmit={(e) => auth(e)}>
        <input
          type="text"
          value={authData.email}
          onChange={(e) => setAuthData((prev) => ({ ...prev, email: e.target.value }))} />
        <input
          type="password"
          value={authData.password}
          onChange={(e) => setAuthData((prev) => ({ ...prev, password: e.target.value }))} />
        <button>
          enter
        </button>
      </form>
    </div>
  )
}
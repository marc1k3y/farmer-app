import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import { checkAuth } from "./http/authThunk"
import { AuthPage } from "./pages/auth"
import { MainPage } from "./pages/main/index"

const routes = {
  farmer: {
    public: [
      { id: 0, path: "/auth", element: <AuthPage /> },
      { id: 0, path: "*", element: <Navigate to="/auth" replace /> }
    ],
    private: [
      { id: 1, path: "/tables/*", element: <MainPage /> },
      { id: 0, path: "*", element: <Navigate to="/tables/pending" replace /> }
    ]
  }
}

export const AppRouter = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.auth)
  const { app } = useAppSelector(state => state.global)
  console.log(app);
  

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  return (
    <Routes>
      {isAuth
        ? routes[app]["private"].map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))
        : routes[app]["public"].map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
    </Routes>
  )
}
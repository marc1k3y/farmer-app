import { useEffect } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./hooks/redux"
import { checkAuth } from "./http/authThunk"
import { AuthPage } from "./pages/auth"
import { MainPage } from "./pages/main/index"

const privateRoutes = [
  { id: 1, path: "/tables/*", element: <MainPage /> },
  { id: 0, path: "*", element: <Navigate to="/tables/pending" replace /> }
]

const publicRoutes = [
  { id: 0, path: "/auth", element: <AuthPage /> },
  { id: 0, path: "*", element: <Navigate to="/auth" replace /> }
]

export const AppRouter = () => {
  const dispatch = useAppDispatch()
  const { isAuth } = useAppSelector(state => state.auth)

  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])
  return (
    <Routes>
      {isAuth
        ? privateRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))
        : publicRoutes.map((route) => (
          <Route key={route.id} path={route.path} element={route.element} />
        ))}
    </Routes>
  )
}
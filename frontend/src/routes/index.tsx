import { lazy, Suspense, type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/AuthContext"

const Index = lazy(() => import("../pages"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const Home = lazy(() => import("../pages/Home"))
const Loading = lazy(() => import("../components/Loading"))


type RequireAuthTypes = { children: ReactNode }

const RequireAuth = ({children}: RequireAuthTypes) =>{
  const { user, laoding } = useAuth();

  if(laoding){
    return <Loading />
  }

  if(!user){
    return <Navigate to="/" />
  }

  return <>{children}</>
}

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<RequireAuth><Home /></RequireAuth>} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
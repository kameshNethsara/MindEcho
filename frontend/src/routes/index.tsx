import { lazy, Suspense, type ReactNode } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import JournalContext from "../context/JournalContext"
import AnalyticsContext from "../context/AnalyticsContext"
import UserProvider  from "../context/UserContext"
import EditProfile from "../pages/EditProfile"

// const Index = lazy(() => import("../pages"))
const Landing = lazy(() => import("../pages/Landing"))
const Login = lazy(() => import("../pages/Login"))
const Register = lazy(() => import("../pages/Register"))
const Home = lazy(() => import("../pages/Home"))
const Journal = lazy(() => import("../pages/Journal"))
const AIAssistant = lazy(() => import("../pages/AIAssistant"))
const Analytics = lazy(() => import("../pages/Analytics"))
const Profile = lazy(() => import("../pages/Profile"))

const AdminHome = lazy(() => import("../pages/AdminHome"))
const AdminUsers = lazy(() => import("../pages/AdminUsers"))
const AdminAnalytics = lazy(() => import("../pages/AdminAnalytics"))

const ForgotPassword = lazy(() => import("../pages/ForgotPassword"))

const Loading = lazy(() => import("../components/Loading"))


type RequireAuthTypes = { children: ReactNode }

const RequireAuth = ({children}: RequireAuthTypes) =>{
  const { user, loading } = useAuth();

  if(loading){
    return <Loading />
  }

  if (!user) {
    console.log("test")
    return <Navigate to="/login" />
  }

  return <>{children}</>
}

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={
            <RequireAuth><JournalContext><AnalyticsContext>
              <Home />
            </AnalyticsContext></JournalContext></RequireAuth>
          } />
          <Route path="/journal" element={
            <RequireAuth><JournalContext>
              <Journal />
            </JournalContext></RequireAuth>
          } />
          <Route path="/analytics" element={
            <RequireAuth><JournalContext><AnalyticsContext>
              <Analytics />
            </AnalyticsContext></JournalContext></RequireAuth>
          } />
          <Route path="/ai-assistant" element={<RequireAuth><AIAssistant /></RequireAuth>} />
          <Route path="/profile" element={
            <RequireAuth> <UserProvider ><JournalContext><AnalyticsContext>
              <Profile />
            </AnalyticsContext></JournalContext></UserProvider ></RequireAuth>
          } />
          <Route path="/edit-profile" element={<RequireAuth><EditProfile /></RequireAuth>} />

          <Route path="/admin-home" element={
            <RequireAuth><JournalContext><AnalyticsContext>
              <AdminHome />
            </AnalyticsContext></JournalContext></RequireAuth>
          } />
          <Route
            path="/admin-users"
            element={
              <RequireAuth>
                <UserProvider>
                  <AdminUsers />
                </UserProvider>
              </RequireAuth>
            }
          />
          <Route path="/admin-analytics" element={
            <RequireAuth><JournalContext><AnalyticsContext>
              <AdminAnalytics />
            </AnalyticsContext></JournalContext></RequireAuth>
          } />

          <Route path="/forgot-password" element={<ForgotPassword />} />
          
        </Routes>

      </Suspense>
    </BrowserRouter>
  )
}
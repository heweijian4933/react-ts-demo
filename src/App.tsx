import React, { useContext, useState } from 'react'
import {
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  useLocation
} from 'react-router-dom'

import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import Protected from './components/Protected'
import Dairy from './components/Dairy'
import Profile from './components/Profile'

import { fakeAuthProvider } from './auth'
import Timer from './components/Timer'

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route
            path="protected"
            element={
              <RequireAuth>
                <Protected />
              </RequireAuth>
            }
          >
            <Route path="dairy" element={<Dairy />} />
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route path="timer" element={<Timer />} />
        </Route>
        <Route path="*" element={<div>Not Found</div>} />
      </Routes>
    </AuthProvider>
  )
}

const AuthContext = React.createContext<AuthContextType>(null!)

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<User>(null!)

  const signin = (user: User, callback?: VoidFunction) => {
    return fakeAuthProvider.signin(user, () => {
      setUser(user)
      callback && callback()
    })
  }
  const signout = (callback?: VoidFunction) => {
    return fakeAuthProvider.signout(() => {
      setUser(null!)
      callback && callback()
    })
  }

  const value = { user, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  return context
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const auth = useAuth()
  const location = useLocation()

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return (
      <Navigate to="/login" state={{ from: location, data: 'test' }} replace />
    )
  }

  return children
}

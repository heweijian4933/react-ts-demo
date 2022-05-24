import { useAuth } from '../App'
import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router'

export default function Login() {
  const [user, setUser] = useState<User>({ username: '', password: '' })
  const navigate = useNavigate()
  const location = useLocation()
  console.log('location=>', location)
  const from = (location as any)!.state?.from?.pathname || '/'
  const { signin } = useAuth()
  const { username, password } = user
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(username, password)
    signin(user, () => {
      navigate(from, { replace: true })
    })
  }

  const onInputChange = (item: Partial<User>) => {
    setUser((prev) => ({ ...prev, ...item }))
  }
  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <div>默认用户名 admin, 密码 123456</div>
          <label htmlFor="username">用户名</label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(e) => onInputChange({ username: e.target.value })}
          />
        </div>
        <div>
          <label htmlFor="password"> 密码</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => onInputChange({ password: e.target.value })}
          />
        </div>
        <button type="submit">登录</button>
      </form>
    </div>
  )
}

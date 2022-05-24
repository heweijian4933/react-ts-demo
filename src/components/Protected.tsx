import { useAuth } from '../App'
import React from 'react'
import { Outlet, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
export default function Protected() {
  const navigate = useNavigate()
  const { user, signout } = useAuth()
  const handleSignout = () => {
    signout(() => navigate('/'))
  }
  return (
    <div>
      <h2>隐私页</h2>
      <div>
        {`你好: ${user.username}`}
        <button onClick={() => handleSignout()}>退出</button>
      </div>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eius aperiam
        cumque vero sed non voluptas, adipisci voluptates ipsum quis nam
        voluptatum rem libero. Ratione dolore, voluptatem sunt veritatis iure
        quam.
      </p>
      <nav>
        <ul>
          <li>
            <Link to="dairy">我的日常</Link>
          </li>
          <li>
            <Link to="profile">我的资料</Link>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  )
}

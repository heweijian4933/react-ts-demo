import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div>
      <h1> 小 demo</h1>

      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia
        temporibus quam quaerat reprehenderit, quasi nulla eveniet aliquid quis?
        Eveniet perspiciatis porro nostrum eligendi, blanditiis fugit dolorem
        minus aliquam quidem rerum.
      </p>
      <nav>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/login">登录页</Link>
          </li>
          <li>
            <Link to="/protected"> 隐私页(需要登录)</Link>
          </li>
          <li>
            <Link to="/timer"> 计时器</Link>
          </li>
        </ul>
      </nav>
      <hr />
      <Outlet />
    </div>
  )
}

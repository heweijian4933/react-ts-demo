import { useAuth } from '../App'
import React from 'react'

export default function Profile() {
  const { user } = useAuth()
  return (
    <div>
      <div>个人资料(私有页面)</div>
      <div>姓名 : {user.username}</div>
      <div>我的密码: {user.password}</div>
      <p>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Atque aliquid,
        perspiciatis doloribus explicabo quo, odit facere dolor eos odio
        consectetur officia et dolore, sed ea accusamus voluptas nemo? Ipsum,
        non?
      </p>
    </div>
  )
}

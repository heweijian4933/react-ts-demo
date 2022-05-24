/**
 * This represents some generic auth provider API, like Firebase.
 */

const DEFAULT_USER: User = {
  username: 'admin',
  password: '123456'
}
const fakeAuthProvider = {
  isAuthenticated: false,
  signin(user: User, cb?: VoidFunction) {
    const { username, password } = user
    if (
      username === DEFAULT_USER.username &&
      password === DEFAULT_USER.password
    ) {
      this.isAuthenticated = true
      cb && cb()
    } else {
      alert('账户名或者密码不正确')
    }
  },
  signout(cb?: VoidFunction) {
    this.isAuthenticated = false
    cb && cb()
  }
}

export { fakeAuthProvider }
